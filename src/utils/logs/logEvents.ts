import { format } from 'date-fns';
import path from 'path';
import { v4 as uuid } from 'uuid';
import fs from 'fs';
import fsPromises from 'fs/promises';

export const logEvents = async (message: string, logName: string) => {
  const dateTime = `${format(new Date(), 'dd-MM-yyyy\tHH:mm:ss')}`;
  const logItem = `${dateTime}\t${uuid()}\t${message}\n`;
  const LOG_FOLDER = 'listLogs';

  try {
    if (!fs.existsSync(path.resolve(__dirname, LOG_FOLDER))) {
      await fsPromises.mkdir(path.join(__dirname, LOG_FOLDER));
    }
    await fsPromises.appendFile(
      path.resolve(__dirname, LOG_FOLDER, logName),
      logItem
    );
  } catch (error) {
    console.log(error);
  }
};
