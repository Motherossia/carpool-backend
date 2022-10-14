import { INestApplication, ValidationPipe } from '@nestjs/common';

// Shared utilities that will be used in both live, e2e, etc.
// To ensure that we're always running predictable server behaviour
export function loadSharedUtilities(app: INestApplication) {
    app.enableVersioning();

    app.useGlobalPipes(new ValidationPipe({ forbidUnknownValues: true, transform: true }));

    app.enableShutdownHooks();
}
