import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class Faculdade1682087438614 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'entrance_exam',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          {
            name: 'description',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'question',
            type: 'text',
          },
          {
            name: 'response',
            type: 'text',
          },
          {
            name: 'level',
            type: 'varchar',
            length: '255',
          },
          {
            name: 'created_at',
            type: 'timestamp with time zone',
            default: 'NOW()',
          },
          {
            name: 'updated_at',
            type: 'timestamp with time zone',
            default: 'NOW()',
          },
        ],
      }),
      true,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('entrance_exam');
  }
}
