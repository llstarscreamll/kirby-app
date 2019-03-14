import { ElectronService } from './electron.service';
import { SerialPortService } from './serial-port.service';

export const ELECTRON_PROVIDERS: any[] = [ElectronService, SerialPortService];

export * from './electron.service';
export * from './serial-port.service';
