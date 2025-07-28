📬 Módulo de Endereços – /address
🛠 Setup para desenvolvimento
Crie um fork do repositório.

-Instale dependências:

npm install

-Copie o .env:

cp .env-example .env

-Crie a tabela address no banco:

id pk uuid
user_id fk to users (id)
zip varchar not null
street_address text not null
number int not null
additional_information varchar nullable
reference varchar nullable
neighborhood text not null
city varchar not null
state not null

🔄 Fluxo de desenvolvimento

Crie uma branch: git checkout -b feat/nome-da-feature

Commit suas alterações: git commit -m 'feat: nova feature'

Push: git push origin feat/nome-da-feature

Crie um Pull Request ✨

⚠️ Por enquanto, use o ID fixo do usuário:

->>> "6cd3fb81-607b-4263-ae0b-8e2178d6a0f1" <<<-

\*Ps: Como você vai usar o banco local, crie essa table ->

CREATE TABLE users (
id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
full_name VARCHAR(100) NOT NULL,
email VARCHAR(150) NOT NULL,
password_hash TEXT NOT NULL,
phone_number VARCHAR(20) NOT NULL,
birth_date DATE,
is_email_verified BOOLEAN NOT NULL DEFAULT false,
email_verification_token TEXT,
email_verified_at TIMESTAMP,
is_active BOOLEAN NOT NULL DEFAULT true,
created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
gender VARCHAR(10) NOT NULL
);

e insira um usuário com o ID fixo:

INSERT INTO users (
id,
full_name,
email,
password_hash,
phone_number,
birth_date,
is_email_verified,
email_verification_token,
email_verified_at,
is_active,
created_at,
updated_at,
gender
) VALUES (
'6cd3fb81-607b-4263-ae0b-8e2178d6a0f1',
'Usuário Exemplo',
'usuario@example.com',
'hashed_password_aqui',
'+5511999999999',
'1995-08-15',
true,
NULL,
NOW(),
true,
NOW(),
NOW(),
'male'
);

📬 Endpoints esperados
Método Rota Ação
GET /address Lista todos os endereços do usuário
POST /address Cria um novo endereço
PUT /address/:id Atualiza um endereço existente
GET /address/:id Busca um endereço específico
DELETE /address/:id Deleta um endereço específico

📋 Regras de Negócio e Validação – /address

🧪 Validações por campo
Campo Tipo Obrigatório Validação
zip string ✅ Sim Deve ser um CEP válido: 12345-678
streetAddress string ✅ Sim Mín. 1 caractere
number number ✅ Sim Inteiro positivo
additionalInformation string ❌ Não Livre
reference string ❌ Não Livre
neighborhood string ✅ Sim Mín. 1 caractere
city string ✅ Sim Mín. 1 caractere
state string ✅ Sim Sigla (2 letras): SP, RJ, etc.

✅ Exemplo de payload válido

{
"zip": "12345-678",
"streetAddress": "Rua das Flores",
"number": 100,
"additionalInformation": "Apto 202",
"reference": "Próximo ao mercado",
"neighborhood": "Centro",
"city": "São Paulo",
"state": "SP"
}

## 📁 Estrutura do Projeto

src/
├── config/ # Configurações (env, db, errors)
├── controller/ # Entrada da aplicação
├── dto/ # Tipagens de entrada
├── entity/ # Entidades de domínio
├── factories/ # Injeção de dependência
├── interfaces/ # Contratos com repositórios/clients
├── repository/ # Implementação do banco de dados
├── routes/ # Rotas da API
├── service/ # Regra de negócio
├── validator/ # Validação com Zod
└── server/ # Inicialização do servidor e gRPC

💡 Project File Examples – Example

✅ entity/example.ts

export class Example {
constructor(
private readonly id: string,
private readonly userId: string,
private readonly name: string,
private readonly number: number,
private readonly city: string,
private readonly state: string,
private readonly optionalInfo?: string
) {}

getId(): string {
return this.id;
}

getName(): string {
return this.name;
}

}

✅ interfaces/repository/example.ts

export interface IExampleRepository {
findAllByUserId(userId: string): Promise<Example[]>;
findById(id: string): Promise<Example | null>;
create(example: Example): Promise<Example>;
update(example: Example): Promise<Example>;
}

✅ service/example.ts

export class ExampleService {
constructor(private readonly exampleRepository: IExampleRepository) {}

async listByUser(userId: string): Promise<Example[]> {
return this.exampleRepository.findAllByUserId(userId);
}

}

✅ repository/example.ts

export class ExampleRepository implements IExampleRepository {
async findAllByUserId(userId: string): Promise<Example[]> {
const rows = await db.select().from(example).where(eq(example.userId, userId)).execute();
return rows.map(exampleMapper);
}

async create(entity: Example): Promise<Example> {
await db.insert(example).values({
id: entity.getId(),
userId: entity.getUserId(),
name: entity.getName(),
number: entity.getNumber(),
city: entity.getCity(),
state: entity.getState(),
optionalInfo: entity.getOptionalInfo()
});
return entity;
}
}

✅ repository/mapper/example.ts

export function exampleMapper(row: any): Example {
return new Example(
row.id,
row.user_id,
row.name,
row.number,
row.city,
row.state,
row.optional_info
);
}

✅ controller/example.ts

export class ExampleController {
constructor(private readonly service: ExampleService) {}

async list(): Promise<Example[]> {
return this.service.listByUser('6cd3fb81-607b-4263-ae0b-8e2178d6a0f1');
}

async create(dto: CreateExampleDto): Promise<Example> {
return this.service.create({ ...dto, userId: '6cd3fb81-607b-4263-ae0b-8e2178d6a0f1' });
}
}

✅ validator/example.ts

export const CreateExampleSchema = z.object({
name: z.string().min(1),
number: z.number().int().positive(),
city: z.string().min(1),
state: z.string().length(2),
optionalInfo: z.string().optional()
});

✅ dto/example.ts

export type CreateExampleDto = {
userId?: string;
name: string;
number: number;
city: string;
state: string;
optionalInfo?: string;
};

✅ factories/example.ts
export const makeExample = () => {
const repository = new ExampleRepository();
const service = new ExampleService(repository);
return new ExampleController(service);
};

✅ routes/example.ts
const exampleController = makeExample();

exampleRoutes.get('/', async (req, res, next) => {
try {
const result = await exampleController.list();
res.json(result);
} catch (err) {
next(err);
}
});

exampleRoutes.post('/', async (req, res, next) => {
try {
const dto: CreateExampleDto = req.body;
const result = await exampleController.create(dto);
res.status(201).json(result);
} catch (err) {
next(err);
}
});

✅ config/db/schemas/example.ts (Drizzle)
export const example = pgTable('example', {
id: uuid('id').primaryKey(),
userId: uuid('user_id').notNull(),
name: varchar('name', { length: 100 }).notNull(),
number: integer('number').notNull(),
city: varchar('city', { length: 100 }).notNull(),
state: varchar('state', { length: 2 }).notNull(),
optionalInfo: varchar('optional_info', { length: 255 }),
});

✅ config/server/setup-routes.ts

export const router = Router();

export function setupRoutes() {
router.get('/', (req, res) => {
res.send('Hello, World!');
});

router.get('/health', healthCheck);

// Registrar módulos da aplicação
router.use('/example', exampleRoutes); // exemplo

return router;
}
