import { applyDecorators, Type } from '@nestjs/common';
import { ApiOkResponse, getSchemaPath } from '@nestjs/swagger';

import { PaginatedDto } from '../dto';

export interface ApiPaginatedOptions {
    type?: Type<any>;
    description?: string;
}

export const ApiPaginatedResponse = (options: ApiPaginatedOptions) => {
    const { type, ...other } = options;
    return applyDecorators(
        ApiOkResponse({
            ...other,
            schema: {
                allOf: [
                    { $ref: getSchemaPath(PaginatedDto) },
                    {
                        properties: {
                            data: {
                                type: 'array',
                                items: { $ref: getSchemaPath(type) },
                            },
                        },
                    },
                ],
            },
        }),
    );
};
