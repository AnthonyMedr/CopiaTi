## 📌 CopiaTi
📍 Gerenciamento de Manutenção de Computadores
📌 Aplicação web para controle de manutenção de computadores, incluindo um cronograma, cadastro de máquinas e um banco de chamados com soluções.

## 🚀 Tecnologias Utilizadas
Backend: PHP (API REST)
Banco de Dados: PostgreSQL
Frontend: HTML, CSS, JavaScript (Vanilla)
Ferramentas: Postman (para testes de API), XAMPP (servidor local)

## ⚙️ Como Configurar o Projeto
1️⃣ Clonar o Repositório
- git clone https://github.com/seuusuario/CopiaTi.git
  
2️⃣ Configurar o Banco de Dados
- Criar um banco de dados no PostgreSQL: (CREATE DATABASE "nome";)
- Criar a tabela computadores:
  
  ![image](https://github.com/user-attachments/assets/888353ec-274b-493f-afe0-305f3d57acad)

3️⃣ Configurar o Backend
- No arquivo core/Database.php, edite as credenciais do banco:

  ![image](https://github.com/user-attachments/assets/188bdeec-683f-4997-b585-85919403adff)

4️⃣ Iniciar o Servidor
- Se estiver usando o XAMPP, coloque os arquivos na pasta htdocs e inicie o Apache.
A API pode ser acessada em: http://localhost/CopiaTi/api/computadores/listar.php

## 🛠️ Próximos Passos
- ✅ Finalizar CRUD (Adicionar, Listar, Editar e Excluir computadores)
- 🔲 Implementar notificações e relatórios
- 🔲 Adicionar níveis de usuários (admin e suporte)
- 🔲 Melhorar a interface com um design responsivo

## 📝 Licença
Este projeto está licenciado sob a licença MIT. Sinta-se livre para usá-lo e modificá-lo conforme necessário.
