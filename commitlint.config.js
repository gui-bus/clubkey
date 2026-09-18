const PORTUGUESE_WORDS_REGEX = /\b(adiciona|adicionado|adicionando|adicionar|cria|criado|criando|criar|altera|alterado|alterando|alterar|alteracao|alteracoes|corrige|corrigido|corrigindo|corrigir|correcao|correcoes|ajusta|ajustado|ajustando|ajustar|ajuste|ajustes|muda|mudando|mudar|mudanca|mudancas|remove|removido|removendo|remover|remocao|atualiza|atualizado|atualizando|atualizar|atualizacao|atualizacoes|melhora|melhorando|melhorar|melhoria|melhorias|arruma|arrumado|arrumando|arrumar|implementa|implementado|implementando|implementar|implementacao|implementacoes|refatora|refatorado|refatorando|refatorar|refatoracao|testa|testado|testando|testar|teste|testes|faz|feito|fazendo|fazer|modulo|modulos|pagina|paginas|tela|telas|botao|botoes|tabela|tabelas|novo|nova|novos|novas|para|com|sem|por|nao|sim|mais|menos|estilo|estilos|funcao|funcoes|variavel|variaveis|erro|erros|aviso|avisos|usuario|usuarios|perfil|perfis|hospedagem|hospedagens|evento|eventos|experiencia|experiencias|beneficio|beneficios|conexao|conexoes)\b/i;

const PORTUGUESE_ACCENTED_CHARS_REGEX = /[áàâãéêíóôõúçÁÀÂÃÉÊÍÓÔÕÚÇ]/;

const Configuration = {
  extends: ['@commitlint/config-conventional'],
  plugins: [
    {
      rules: {
        'subject-must-be-english': ({ subject }) => {
          if (!subject) return [true];

          if (PORTUGUESE_ACCENTED_CHARS_REGEX.test(subject)) {
            return [
              false,
              'Commit subject must be in English (contains accented characters like á, é, ã, ç, etc.)',
            ];
          }

          const matchedWord = subject.match(PORTUGUESE_WORDS_REGEX);
          if (matchedWord) {
            return [
              false,
              `Commit subject must be in English! Detected Portuguese word: "${matchedWord[0]}"`,
            ];
          }

          return [true];
        },
      },
    },
  ],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'build',
        'chore',
        'ci',
        'docs',
        'feat',
        'fix',
        'perf',
        'refactor',
        'revert',
        'style',
        'test',
      ],
    ],
    'type-case': [2, 'always', 'lower-case'],
    'type-empty': [2, 'never'],
    'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case', 'upper-case']],
    'subject-empty': [2, 'never'],
    'subject-full-stop': [2, 'never', '.'],
    'header-max-length': [2, 'always', 100],
    'subject-must-be-english': [2, 'always'],
  },
};

export default Configuration;
