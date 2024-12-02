<?php

// Obter dados do formulário
$nome = $_POST['nome'];
$email = $_POST['email'];
$telefone = $_POST['telefone'];
$mensagem = $_POST['mensagem'];

//Configurações de credenciais
$server = 'localhost';
$usuario = 'root';
$senha = '';
$banco = 'bd_formulario';

// Conexão com banco de dados
$conn = new mysqli('$server', '$usuario', '$senha' ,'$banco');

// Verificar conexão
if ($conn->connect_error) {
    die(" A Conexão falhou: " . $conn->connect_error);
}

$smtp = $conn->prepare("INSERT INTO banco"(nome, email, telefone, mensagem) VALUES(?,?,?,?)"");
$smtp = $conn->bind_param("ssis"$nome,$email,$telefone,$mensagem);

if ($stmt->execute()) {
    echo "Cadastro realizado com sucesso!";
} else {
    echo "Erro: " . $smtp->error;
}

$smtp->close();
$conn->close();




