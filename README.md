# Academy Neon - Apresentação Interativa

Uma apresentação moderna e profissional do sistema Academy Neon, criada com tecnologias web avançadas.

## 🚀 Características

- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Navegação Intuitiva**: Setas do teclado, cliques e gestos touch
- **Arquitetura Organizada**: Código separado em módulos CSS e JavaScript
- **Animações Suaves**: Transições profissionais entre slides
- **Fácil Manutenção**: Estrutura de arquivos bem definida

## 📁 Estrutura do Projeto

```
academy-app-IFGOIANO/
├── index.html                    # Arquivo principal da apresentação
├── css/
│   └── styles.css               # Estilos principais da apresentação
├── js/
│   └── presentation.js          # Lógica de navegação e interatividade
├── assets/
│   └── images/                  # Todas as imagens da apresentação
│       ├── paginainicial.png   # Dashboard principal
│       ├── listaclientes.png   # Lista de clientes
│       ├── cadastro.png # Formulário de cadastro
│       ├── planos.png    # Planos de treino
│       ├── aulas.png # Agendamento de aulas
│       ├── franquias.png        # Sistema de franquias
│       ├── notificacoes.png     # Central de notificações
│       └── login.png            # Tela de login
└── README.md                    # Esta documentação
```

## 🎯 Como Usar

1. **Configurar as Imagens**
   - Mova suas imagens para a pasta `assets/images/`
   - Renomeie conforme a estrutura indicada
   - Veja `assets/images/README.md` para detalhes

2. **Abrir a Apresentação**
   - Abra o arquivo `index.html` em qualquer navegador moderno
   - **Recomendado**: Use um servidor local para melhor performance

3. **Navegação**
   - **Setas do teclado**: ← → para navegar entre slides
   - **Tecla P**: Abre o painel de navegação
   - **ESC**: Fecha o painel de navegação

## 🛠️ Organização dos Arquivos

### HTML (index.html)
- Estrutura principal da apresentação
- Referencias para CSS e JavaScript externos
- Conteúdo semântico de cada slide

### CSS (css/styles.css)
- Todas as variáveis CSS organizadas
- Estilos responsivos
- Animações e transições
- Temas de cores e tipografia

### JavaScript (js/presentation.js)
- Classe `MinimalistPresentation` 
- Lógica de navegação entre slides
- Controle do painel de navegação
- Manipulação de eventos de teclado

### Imagens (assets/images/)
- Todas as capturas de tela do sistema
- Nomes padronizados com hífens
- Formatos otimizados (PNG recomendado)

## 🎨 Personalização

### Modificar Cores
```css
/* Em css/styles.css, altere as variáveis CSS */
:root {
    --background: #020817;
    --foreground: #f8fafc;
    --primary: #f8fafc;
    /* ... outras variáveis */
}
```

### Adicionar Novos Slides
1. Adicione uma nova `<section class="slide">` no HTML
2. Defina `data-slide` e `data-title` apropriados
3. O JavaScript automaticamente inclui no navegador

### Modificar Animações
```css
/* Em css/styles.css, altere as propriedades de transição */
.slide {
    transition: opacity 0.5s ease, transform 0.5s ease;
}
```

## 📱 Compatibilidade

- **Navegadores**: Chrome, Firefox, Safari, Edge (versões modernas)
- **Dispositivos**: Desktop, Tablet, Smartphone
- **Sistemas**: Windows, macOS, Linux, iOS, Android

## 🚀 Deployment

### Servidor Local (RECOMENDADO)
```bash
# Python 3
python -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000

# Visual Studio Code
# Instale a extensão "Live Server"
```

### ⚠️ Importante sobre Imagens
Para garantir que todas as imagens carreguem corretamente:

1. **Organize as imagens** na pasta `assets/images/`
2. **Use nomes corretos** conforme especificado
3. **Sempre use um servidor local** para desenvolvimento
4. **Teste em diferentes navegadores**

## 📋 Controles da Apresentação

| Ação | Tecla | Descrição |
|------|-------|-----------|
| Próximo slide | → / Space | Avança para o próximo slide |
| Slide anterior | ← | Volta para o slide anterior |
| Painel navegação | P | Abre/fecha painel de slides |
| Fechar painel | ESC | Fecha painel de navegação |
| Tela cheia | F11 | Ativa/desativa modo tela cheia |

## 🔧 Solução de Problemas

### Imagens não aparecem
1. Verifique se estão na pasta `assets/images/`
2. Confirme os nomes dos arquivos
3. Use um servidor local
4. Abra o console do navegador (F12) para ver erros

### CSS/JS não carrega
1. Verifique os caminhos dos arquivos
2. Confirme que todos os arquivos existem
3. Use um servidor local
4. Limpe o cache do navegador

### Performance lenta
1. Otimize as imagens (comprima)
2. Use formatos modernos (WebP)
3. Sempre use servidor local
4. Teste em navegadores diferentes

## 🆘 Suporte

Para suporte técnico:
1. Verifique esta documentação
2. Consulte os READMEs das subpastas
3. Verifique o console do navegador
4. Teste em diferentes navegadores

---

**Desenvolvido por**: Bruno e Gustavo Fernandes  
**Versão**: 2.0.0 - Estrutura Organizada  
**Última atualização**: 2024

### ✨ Novidades da Versão 2.0:
- **Estrutura modular** com arquivos separados
- **CSS organizado** em arquivo externo
- **JavaScript modular** para melhor manutenção
- **Pasta de assets** dedicada para imagens
- **Documentação atualizada** para nova estrutura
- **Nomes de arquivo padronizados**
- **Melhor organização para desenvolvimento**
