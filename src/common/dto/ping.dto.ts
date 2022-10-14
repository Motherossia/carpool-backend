import { ApiProperty } from '@nestjs/swagger';

export class PingDto {
    @ApiProperty()
    ping: 'pong';
}
