const tipoSpent = Object.freeze({
    SALARIO_FUNCIONARIOS : "SALARIO_FUNCIONARIOS",
    ALUGUEL : "ALUGUEL",
    CONTA_DE_ENERGIA : "CONTA_DE_ENERGIA",
    CONTA_DE_AGUA : "CONTA_DE_AGUA",
    MATERIAL_PEDAGOGICO : "MATERIAL_PEDAGOGICO",
    LIMPEZA : "LIMPEZA",
    TRANSPORTE : "TRANSPORTE",
    MANUTENCAO : "MANUTENCAO",
    SEGURO : "SEGURO",
    INTERNET : "INTERNET",
    ALIMENTACAO : "ALIMENTACAO",
    GERAL : "GERAL"
})

const tipoRole = Object.freeze({
    ROLE_ADMIN : "ROLE_ADMIN",
    ROLE_MONITORA : "ROLE_MONITORA"
})

const tipoRegistration = Object.freeze({
    ENTRADA : 'ENTRADA',
    SAIDA : 'SAIDA'
})


export { tipoSpent, tipoRole, tipoRegistration };
