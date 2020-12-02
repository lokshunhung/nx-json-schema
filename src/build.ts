import * as fs from 'fs';
import * as path from 'path';
import * as prettier from 'prettier';

function format(contents: string) {
  return prettier.format(contents, {
    filepath: '_.json',
    tabWidth: 2,
    useTabs: false,
  });
}

async function build() {
  const modules = await Promise.all([
    import('./nx.schema'),
    import('./workspace.schema'),
  ]);

  const entries = modules.flatMap((mod) => {
    return Object.entries(mod.default);
  });

  await Promise.all(
    entries.map(([name, schema]) =>
      fs.promises.writeFile(
        path.join(__dirname, '..', 'dist', name),
        format(JSON.stringify(schema)),
        { encoding: 'utf8' }
      )
    )
  );
}

build();
