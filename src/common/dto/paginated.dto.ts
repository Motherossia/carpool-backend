import { ApiProperty } from '@nestjs/swagger';

export class PaginatedDto<TData> {
    data: TData[];

    @ApiProperty()
    total: number;

    @ApiProperty()
    limit: number;

    @ApiProperty()
    page: number;
}
