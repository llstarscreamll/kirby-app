@setup
require '/Users/johan/.composer/vendor/autoload.php';
\Dotenv\Dotenv::createImmutable(__DIR__, '.env')->load();

$site = env(strtoupper($target ?? 'lab').'_SITE');
$userAndServers = explode(';', env(strtoupper($target ?? 'lab').'_SERVERS'));
$baseDir = "~/{$site}";
$releasesDir = "{$baseDir}/releases";
$currentDir = "{$baseDir}/current";
$newReleaseName = date('Y_m_d-H_i_s');
$newReleaseDir = "{$releasesDir}/{$newReleaseName}";
$branch = $branch ?? env('DEFAULT_BRANCH', 'develop');
$user = get_current_user();

$configuration = isset($target) && $target == 'prod' ? 'production' : 'staging';

function logMessage($message) {
return "echo '\033[32m" .$message. "\033[0m';\n";
}
@endsetup

@servers(['local' => '127.0.0.1', 'remote' => $userAndServers])

@story('deploy')
startDeployment
setupReleaseDir
compile
uploadCompiledFiles
setPermissions
blessNewRelease
cleanOldReleases
finishDeploy
@endstory

@task('startDeployment', ['on' => 'local'])
{{ logMessage("🏃  Starting deployment...") }}
git checkout {{ $branch }}
git pull origin {{ $branch }}
@endtask

@task('setupReleaseDir', ['on' => 'remote'])
{{ logMessage("🌀  Setup release dir...") }}
[ -d {{ $releasesDir }} ] || mkdir -p {{ $releasesDir }};
cd {{ $releasesDir }};

# Create the release dir
mkdir {{ $newReleaseDir }};

# Mark release
cd {{ $newReleaseDir }}
echo "{{ $newReleaseName }}" > release-name.txt
@endtask

@task('compile', ['on' => 'local'])
{{ logMessage("🚚  Compile project...") }}
echo $PWD
ngtw build && ng build --prod --project={{ $project }} --configuration={{ $configuration }}
@endtask

@task('uploadCompiledFiles', ['on' => 'local'])
{{ logMessage("🔗  Upload compiled files...") }}
@foreach ($userAndServers as $server)
    scp -r dist/apps/{{ $project }}/* {{ $server }}:{{ $newReleaseDir }}
@endforeach
@endtask

@task('setPermissions', ['on' => 'remote'])
{{ logMessage("🔐  Set folders permissions...") }}
cd {{ $baseDir }};
sudo chgrp -R www-data .
sudo chmod -R ug+rwx .
@endtask

@task('blessNewRelease', ['on' => 'remote'])
{{ logMessage("🙏  Blessing new release...") }}
ln -nfs {{ $newReleaseDir }} {{ $currentDir }};
@endtask

@task('cleanOldReleases', ['on' => 'remote'])
{{ logMessage("🚾  Cleaning up old releases...") }}
# Delete all but the 5 most recent.
cd {{ $releasesDir }}
ls -dt {{ $releasesDir }}/* | tail -n +6 | xargs -d "\n" sudo chown -R $USER .;
ls -dt {{ $releasesDir }}/* | tail -n +6 | xargs -d "\n" rm -rf;
@endtask

@task('finishDeploy', ['on' => 'local'])
{{ logMessage("🚀  Application deployed!") }}
@endtask
