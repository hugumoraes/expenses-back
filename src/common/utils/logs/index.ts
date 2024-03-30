/* ---------- External ---------- */
import { config } from 'dotenv';
import { createLogger, format, transports } from 'winston';
import chalk from 'chalk';

config();

const {
  combine,
  timestamp: format_timestamp,
  printf,
  label: format_label,
} = format;

const { LOGLEVEL } = process.env;

const levels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

const console_format = printf(({ level, message, timestamp, label }) => {
  const level_uppercase = level.toUpperCase();

  const timestamp_time = `${new Date(timestamp).toLocaleTimeString(
    'it-US',
  )}.${new Date(timestamp).getMilliseconds()}ms`;

  label = chalk.black.bgCyanBright.bold(` ${label} `);
  timestamp = chalk.black.bgWhiteBright(` ${timestamp_time} `);

  if (typeof message === 'object') {
    message = JSON.stringify(message, null, 4);
  }

  switch (level_uppercase) {
    case 'INFO':
      message = chalk.greenBright(message);
      level = chalk.black.bgGreenBright.bold(` ${level_uppercase} `);
      break;

    case 'WARN':
      message = chalk.yellowBright(message);
      level = chalk.black.bgYellowBright.bold(` ${level_uppercase} `);
      break;

    case 'ERROR':
      message = chalk.redBright(message);
      level = chalk.black.bgRedBright.bold(` ${level_uppercase} `);
      break;

    case 'DEBUG':
      message = chalk.blueBright(message);
      level = chalk.black.bgBlueBright.bold(` ${level_uppercase} `);
      break;

    default:
      break;
  }

  return `${label}${timestamp}${level}: ${message}`;
});

const file_format = printf(({ level, message, label, timestamp }) => {
  return `[${label}] [${timestamp}] [${level}]: ${message}`;
});

export const logger = createLogger({
  format: combine(
    format_label({ label: 'Expenses' }),
    format_timestamp(),
    format.splat(),
    console_format,
  ),
  levels,
  transports: [
    new transports.Console({ level: LOGLEVEL ?? 'info' }),
    new transports.File({
      level: LOGLEVEL ?? 'info',
      filename: 'logs/output.log',
      format: combine(
        format_label({ label: 'Expenses' }),
        format_timestamp(),
        format.splat(),
        file_format,
      ),
    }),
  ],
});
