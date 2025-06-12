import express, { Request, Response } from 'express';
import * as prettier from 'prettier';

const app = express();

app.use(express.text({ type: '*/*' }));

app.post('/', async (req: Request, res: Response) => {
  try {
    const formattedText = await prettier.format(req.body, {
      filepath: req.get('X-File-Name') || '',
      singleQuote: true,
      trailingComma: 'none',
      jsxSingleQuote: false,
    });

    res.status(200).type('text/plain').send(formattedText);
  } catch (err: unknown) {
    res
      .status(500)
      .type('text/plain')
      .send(
        `INTERNAL SERVER ERROR: ${(err as Error).toString()}  ${(err as Error).stack}`,
      );
  }
});

export default app;
