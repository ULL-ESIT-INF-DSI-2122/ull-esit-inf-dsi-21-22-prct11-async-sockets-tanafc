import * as express from 'express';
import {spawn} from 'child_process';

/**
 * Inializing the Express server
 */
const app = express();

/** For querys of commands */
app.get('/execmd', (req, res) => {
  console.log(req.query);

  if (!req.query.cmd) {
    res.send({
      error: 'A command has to be provided',
    });
  } else {
    let arrayArgs: string[] = [];
    if (req.query.args) {
      const args = req.query.args as string;
      arrayArgs = args.split(';');
    }

    const command = spawn(req.query.cmd as string, arrayArgs);

    command.on('error', (err) => {
      res.send({
        error: `Command does not exist, ${err.toString()}`,
      });
    });

    let cmdOutput = '';
    command.stdout.on('data', (chunk) => {
      cmdOutput += chunk;
    });

    let errOutput = '';
    command.stderr.on('data', (err) => {
      errOutput += err;
    });

    command.on('close', () => {
      if (errOutput) {
        res.send({
          error: errOutput,
        });
      } else if (cmdOutput) {
        res.send({
          output: cmdOutput,
        });
      }
    });
  }
});

/** Not valid */
app.get('*', (_, res) => {
  res.send('<h1>404</h1>');
});

/** Listen to port 3000 */
app.listen(3000, () => {
  console.log('Server is up on port 3000');
});