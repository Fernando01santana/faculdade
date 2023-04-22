import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export class Faculdade1682087726482 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'exam',
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
          },
          {
            name: 'status',
            type: 'varchar',
          },
          {
            name: 'test_grade',
            type: 'float',
          },
          {
            name: 'course',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );

    await queryRunner.addColumn(
      'exam',
      new TableColumn({
        name: 'entrance_exam_id',
        type: 'uuid',
        isNullable: true,
      }),
    );

    await queryRunner.createForeignKey(
      'exam',
      new TableForeignKey({
        columnNames: ['entrance_exam_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'entrance_exam',
        onDelete: 'SET NULL',
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    const examTable = await queryRunner.getTable('exam');
    const foreignKey = examTable.foreignKeys.find(
      (fk) => fk.columnNames.indexOf('entrance_exam_id') !== -1,
    );
    await queryRunner.dropForeignKey('exam', foreignKey);
    await queryRunner.dropColumn('exam', 'entrance_exam_id');
    await queryRunner.dropTable('exam');
  }
}
