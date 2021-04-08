import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateOrdersTable1617857278150 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table(
      {
        name: 'order',
        columns: [
          {
            name: 'id',
            type: 'integer',
            unsigned: true,
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'id_client',
            type: 'integer',
            unsigned: true,
          },
          {
            name: 'id_product',
            type: 'integer',
            unsigned: true,
          },
          {
            name: 'quantity',
            type: 'integer',
            unsigned: true,
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'note',
            type: 'varchar',
          },
          {
            name: 'form_of_payment',
            type: 'varchar',
          },
        ],
				foreignKeys: [
					{
						name: 'FKClient',
						referencedTableName: 'clients',
						referencedColumnNames: ['id'],
						columnNames: ['id_client'],
						onDelete: 'CASCADE',
						onUpdate: 'CASCADE',
					},
          {
            name: 'FKProduct',
            referencedTableName: 'products',
            referencedColumnNames: ['id'],
            columnNames: ['id_product'],
            onDelete: 'CASCADE',
            onUpdate: 'CASCADE',
          }
				]
      }
    ))
  }
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('order')
  }
}
