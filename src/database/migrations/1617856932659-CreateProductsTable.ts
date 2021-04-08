import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateProductsTable1617856932659 implements MigrationInterface {
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(new Table(
			{
				name: 'products',
				columns: [
					{
						name: 'id',
						type: 'integer',
						unsigned: true,
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment'
					},
					{
						name: 'name',
						type: 'varchar',
					},
					{
						name: 'color',
						type: 'varchar',
					},
					{
						name: 'size',
						type: 'varchar',
					},
					{
						name: 'value',
						type: 'integer',
					},
				]
			}
		))
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('products')
	}
}