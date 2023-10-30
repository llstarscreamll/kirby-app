@setup
  require '/home/j0h4n/.composer/vendor/autoload.php';
  \Dotenv\Dotenv::createImmutable(__DIR__, '.env')->load();

  $site = env(strtoupper($target ?? 'lab').'_SITE');
  $servers = explode(';', env(strtoupper($target ?? 'lab').'_SERVERS'));
  $baseDir = "~/{$site}";
  $releasesDir = "{$baseDir}/releases";
  $currentDir = "{$baseDir}/current";
  $newReleaseName = date('Y_m_d-H_i_s');
  $newReleaseDir = "{$releasesDir}/{$newReleaseName}";
  $user = get_current_user();

  $configuration = isset($target) && $target == 'prod' ? 'production' : 'staging';

  function logMessage($message) {
  return "echo '\033[32m" .$message. "\033[0m';\n";
  }
@endsetup

@servers(['local' => '127.0.0.1', 'remote' => $servers])

@story('deploy')
  startDeployment
  setupReleaseDir
  compile
  uploadCompiledFiles
  blessNewRelease
  cleanOldReleases
  finishDeploy
@endstory

@story('setup-server')
  startMessage
  updateDistro
  installNginx
  setupNginxServerBlock
  checkPortsConfig
@endstory

@task('startDeployment', ['on' => 'local'])
    {{ logMessage("🏃  Starting {$site} deployment...") }}
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
  nx build --prod --project={{ $project }} --configuration={{ $configuration }}
@endtask

@task('uploadCompiledFiles', ['on' => 'local'])
  {{ logMessage("🔗  Upload compiled files...") }}
  @foreach ($servers as $server)
      scp -r dist/apps/{{ $project }}/* {{ $server }}:{{ $newReleaseDir }}
  @endforeach
@endtask

@task('blessNewRelease', ['on' => 'remote'])
  {{ logMessage("🙏  Blessing new release...") }}

  sudo mkdir -p /var/www/{{ $site }}/releases
  sudo cp -R {{ $newReleaseDir }} /var/www/{{ $site }}/releases
  cd /var/www/{{ $site }}/releases/{{ $newReleaseName }}
  sudo chown nginx:nginx /var/www/{{ $site }}
  sudo chcon -R -t httpd_sys_content_t /var/www/{{ $site }}/releases
  sudo ln -nfs /var/www/{{ $site }}/releases/{{ $newReleaseName }} /var/www/{{ $site }}/current
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

{{-- Setup Server Tasks --}}

@task('startMessage', ['on' => 'local'])
    {{ logMessage("Setting up {$target} server at ".json_encode($servers)) }}
@endtask

@task('updateDistro', ['on' => 'remote'])
    {{ logMessage("Updating distro") }}
    sudo dnf update --assumeyes
@endtask

@task('installNginx', ['on' => 'remote'])
    {{ logMessage("Install Nginx") }}
    sudo dnf install --assumeyes nginx
    sudo systemctl enable nginx
@endtask

@task('setupNginxServerBlock', ['on' => 'remote'])
    {{ logMessage("Setup Nginx server block") }}
    > {{ $site }}.conf
    > server-block-template.conf
    echo "{{ "c2VydmVyIHsKICBzZXJ2ZXJfdG9rZW5zIG9mZjsKCiAgbGlzdGVuIDpwb3J0OjsKICBsaXN0ZW4gWzo6XTo6cG9ydDo7CiAgc2VydmVyX25hbWUgXzsKCiAgaW5kZXggaW5kZXguaHRtbDsKICByb290IDpkb2N1bWVudF9yb290OjsKCiAgcmVzb2x2ZXJfdGltZW91dCAzMHM7CgogIGNsaWVudF9tYXhfYm9keV9zaXplIDIwbTsKICBjbGllbnRfYm9keV9idWZmZXJfc2l6ZSAxMjhrOwoKICBhZGRfaGVhZGVyIFgtUm9ib3RzLVRhZyBub2luZGV4OwogIGFkZF9oZWFkZXIgU3RyaWN0LVRyYW5zcG9ydC1TZWN1cml0eSAibWF4LWFnZT0zMTUzNjAwMDsgaW5jbHVkZVN1YmRvbWFpbnM7IHByZWxvYWQiOwogIGFkZF9oZWFkZXIgWC1GcmFtZS1PcHRpb25zIFNBTUVPUklHSU47CiAgYWRkX2hlYWRlciBYLUNvbnRlbnQtVHlwZS1PcHRpb25zIG5vc25pZmY7CiAgYWRkX2hlYWRlciBYLVhTUy1Qcm90ZWN0aW9uICIxOyBtb2RlPWJsb2NrIjsKICBhZGRfaGVhZGVyIENvbnRlbnQtU2VjdXJpdHktUG9saWN5ICJkZWZhdWx0LXNyYyAnc2VsZicgcHJveWVjdG8uY2FiYWxsby5jb20uY286ODAwMDsgc2NyaXB0LXNyYyAnc2VsZicgJ3Vuc2FmZS1pbmxpbmUnICd1bnNhZmUtZXZhbCcgaHR0cHM6Ly9zc2wuZ29vZ2xlLWFuYWx5dGljcy5jb20gaHR0cHM6Ly9hc3NldHMuemVuZGVzay5jb20gaHR0cHM6Ly9jb25uZWN0LmZhY2Vib29rLm5ldDsgaW1nLXNyYyAnc2VsZicgaHR0cHM6Ly9zc2wuZ29vZ2xlLWFuYWx5dGljcy5jb20gaHR0cHM6Ly9zLXN0YXRpYy5hay5mYWNlYm9vay5jb20gaHR0cHM6Ly9hc3NldHMuemVuZGVzay5jb207IHN0eWxlLXNyYyAnc2VsZicgJ3Vuc2FmZS1pbmxpbmUnIGh0dHBzOi8vZm9udHMuZ29vZ2xlYXBpcy5jb20gaHR0cHM6Ly9hc3NldHMuemVuZGVzay5jb207IGZvbnQtc3JjIGh0dHBzOi8vZm9udHMuZ3N0YXRpYy5jb20gaHR0cHM6Ly90aGVtZXMuZ29vZ2xldXNlcmNvbnRlbnQuY29tICdzZWxmJzsgZnJhbWUtc3JjIGh0dHBzOi8vYXNzZXRzLnplbmRlc2suY29tIGh0dHBzOi8vd3d3LmZhY2Vib29rLmNvbSBodHRwczovL3Mtc3RhdGljLmFrLmZhY2Vib29rLmNvbSBodHRwczovL3RhdXR0LnplbmRlc2suY29tOyBvYmplY3Qtc3JjICdub25lJyI7CgogIGxvY2F0aW9uIC8gewogICAgICAgIHRyeV9maWxlcyAkdXJpICR1cmkvIC9pbmRleC5odG1sOwogICAgfQoKfQo=" }}" >> ~/server-block-template.conf
    cat ~/server-block-template.conf | base64 --decode >> {{ $site }}.conf
    sed -i 's|:port:|4200|' {{ $site }}.conf
    sed -i "s|:document_root:|/var/www/{{ $site }}/current|" {{ $site }}.conf
    sudo cp {{ $site }}.conf /etc/nginx/conf.d/
    rm {{ $site }}.conf
    rm server-block-template.conf

    sudo nginx -t

    sudo semanage port -a -t http_port_t -p tcp 4200 || true
    sudo semanage port -m -t http_port_t -p tcp 4200

    sudo systemctl restart nginx
@endtask

@task('checkPortsConfig', ['on' => 'remote'])
    {{ logMessage("Get ports configuration") }}
    sudo ss -tulpn | grep LISTEN
    sudo firewall-cmd --permanent --list-all
@endtask
