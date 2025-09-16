# Academy Neon - Apresentação Interativa

Uma apresentação moderna e profissional do sistema Academy Neon, criada com tecnologias web avançadas.

## 🚀 Características

- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Navegação Intuitiva**: Setas do teclado, cliques e gestos touch
- **Visualização de Imagens**: Clique nas imagens para expandir em tela cheia
- **Cursor Personalizado**: Cursor raio neon para melhor experiência visual
- **Ícones SVG Neon**: Ícones personalizados com efeitos visuais
- **Animações Suaves**: Transições profissionais entre slides
- **Fácil Customização**: Arquivo de configuração JSON
- **Performance Otimizada**: Carregamento rápido e eficiente

## 📁 Estrutura do Projeto

```
Slides/
├── index.html              # Arquivo principal
├── config/
│   └── config.json         # Configurações do site
├── css/
│   └── styles.css          # Estilos personalizados
├── js/
│   └── app.js             # Lógica da aplicação
├── images/
│   └── README.md          # Instruções para imagens
└── README.md              # Esta documentação
```

## 🎯 Como Usar

1. **Abrir a Apresentação**
   - Abra o arquivo `index.html` em qualquer navegador moderno
   - Ou sirva os arquivos através de um servidor web

2. **Navegação**
   - **Setas do teclado**: ← → para navegar
   - **Clique**: Nos botões laterais
   - **Touch**: Deslize para esquerda/direita em dispositivos móveis
   - **Atalhos**: Home (primeiro slide), End (último slide)

3. **Visualização de Imagens**
   - **Clique nas imagens**: Para expandir em tela cheia
   - **ESC**: Para fechar a visualização expandida
   - **Clique fora da imagem**: Para fechar a visualização

## ⚙️ Funcionalidades Interativas

### 🖼️ Modal de Imagens
- Clique em qualquer imagem para visualizar em tela cheia
- Navegação por teclado (ESC para fechar)
- Efeitos visuais suaves de entrada e saída
- Informações contextuais da imagem

### 🖱️ Cursor Personalizado
- Cursor raio neon simplificado
- Consistente em todos os elementos interativos:
  - ⚡ Cursor padrão (raio neon)
  - ⚡ Cursor de ação para todos os elementos clicáveis

### 🎨 Efeitos Visuais
- Ícones SVG neon com hover effects
- Shimmer effect durante carregamento de imagens
- Indicadores de zoom ao passar o mouse
- Gradientes neon nos elementos interativos
- Transições suaves em todos os componentes

## 🎨 Personalização Avançada

### Cursor Personalizado
```css
/* Modificar cursor padrão */
body {
  cursor: url('data:image/svg+xml;utf8,<svg>...</svg>'), auto;
}
```

### Modal de Imagens
```css
/* Personalizar modal */
.image-modal {
  background: rgba(0, 0, 0, 0.95);
  backdrop-filter: blur(20px);
}
```

### CSS Customizado
- Edite `css/styles.css` para modificar estilos
- Use variáveis CSS para mudanças globais
- Adicione animações personalizadas

### JavaScript
- Modifique `js/app.js` para nova funcionalidade
- Adicione eventos personalizados
- Integre com APIs externas

## 📱 Compatibilidade

- **Navegadores**: Chrome, Firefox, Safari, Edge (versões modernas)
- **Dispositivos**: Desktop, Tablet, Smartphone
- **Sistemas**: Windows, macOS, Linux, iOS, Android

## 🔧 Solução de Problemas

### Imagens não aparecem
- **Verifique os arquivos**: Confirme se as imagens estão na pasta `assets/imgs/`
- **Nomes corretos**: As imagens devem ter os nomes exatos:
  - `paginainicial.png`
  - `listaclient.PNG` 
  - `cadastro.PNG`
  - `planos.PNG`
  - `aulas.PNG`
  - `franquias.PNG`
  - `notificacoes.PNG`
  - `login.PNG`
- **Console do navegador**: Abra F12 e veja se há erros de carregamento
- **Comando debug**: Digite `debugImages()` no console para verificar status
- **Servidor local**: Use um servidor local em vez de abrir diretamente o arquivo

### Debug de Imagens
```javascript
// No console do navegador, digite:
debugImages()
```

### Cursor não aparece personalizado
- Verifique se o navegador suporta SVG em cursors
- Teste em navegadores modernos (Chrome, Firefox, Safari, Edge)
- Fallback automático para cursor padrão

### Imagens não carregam
- Verifique se os caminhos estão corretos
- Confirme se as imagens estão na pasta correta
- Teste com um servidor web local

### Configurações não aplicam
- Valide a sintaxe do JSON em `config.json`
- Verifique o console do navegador para erros
- Recarregue a página após mudanças

### Performance lenta
- Otimize as imagens (compressão)
- Use um CDN para recursos externos
- Ative o cache do navegador
- **Importante**: Sempre use um servidor local para melhor performance

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
# Instale a extensão "Live Server" e clique com botão direito no index.html
```

### ⚠️ Importante sobre Imagens
As imagens podem não carregar corretamente quando você abre o `index.html` diretamente no navegador devido às políticas de segurança (CORS). **Sempre use um servidor local** para garantir que tudo funcione corretamente.

## 📋 Controles da Apresentação

| Ação | Tecla/Gesto | Descrição |
|------|-------------|-----------|
| Próximo slide | → / Space / PageDown | Avança para o próximo slide |
| Slide anterior | ← / PageUp | Volta para o slide anterior |
| Primeiro slide | Home | Vai para o slide inicial |
| Último slide | End | Vai para o slide final |
| Expandir imagem | Clique na imagem | Abre imagem em tela cheia |
| Fechar imagem | ESC / Clique fora | Fecha visualização expandida |
| Tela cheia | F11 | Ativa/desativa modo tela cheia |
| Sair tela cheia | ESC | Sai do modo tela cheia |
| Deslizar | Touch horizontal | Navegação em dispositivos móveis |

## 🆘 Suporte

Para suporte técnico ou dúvidas:
- Verifique esta documentação primeiro
- Consulte o console do navegador para erros
- Teste em diferentes navegadores

## 📄 Licença

Este projeto foi desenvolvido para Academy Neon.
Todos os direitos reservados.

---

**Desenvolvido por**: Bruno e Gustavo Fernandes  
**Versão**: 2.0.0  
**Última atualização**: 2024

### ✨ Novidades da Versão 2.0:
- Modal de visualização de imagens em tela cheia
- Cursor personalizado raio neon simplificado
- Ícones SVG neon personalizados
- Indicadores visuais de zoom
- Efeitos de carregamento de imagens
- Melhor experiência de navegação
- Suporte completo a teclado e touch
- **Sistema robusto de carregamento de imagens**
- **Placeholders automáticos quando imagens falham**
- **Debug tools para diagnóstico**
