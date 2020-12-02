import * as fs from 'fs';
import * as path from 'path';

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
                JSON.stringify(schema, null, 4),
                { encoding: 'utf8' }
            )
        )
    );
}

build();
