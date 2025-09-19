# Academy Neon - Apresentação Interativa

Uma apresentação moderna e profissional do sistema Academy Neon, criada com tecnologias web avançadas e otimizada para deploy na Vercel.

## 🚀 Características

- **Design Responsivo**: Funciona perfeitamente em desktop, tablet e mobile
- **Navegação Avançada**: Teclado, touch gestures, e painel interativo
- **Arquitetura Organizada**: Código modular separado em CSS e JavaScript
- **Deploy Automatizado**: Configurado para Vercel com otimizações
- **Sistema de Fallback**: Placeholders automáticos para imagens
- **Performance Otimizada**: Cache inteligente e CDN global
- **Autoplay Opcional**: Apresentação automática (tecla A)
- **Debug Tools**: Ferramentas de desenvolvimento integradas

## 📁 Estrutura do Projeto

```
academy-app-IFGOIANO/
├── index.html                    # Arquivo principal da apresentação
├── package.json                  # Configurações do projeto NPM
├── vercel.json                   # Configuração de deploy Vercel
├── .gitignore                   # Arquivos ignorados pelo Git
├── DEPLOY.md                    # Guia completo de deploy
├── css/
│   └── styles.css               # Estilos principais + responsivos
├── js/
│   └── presentation.js          # Lógica avançada de navegação
├── assets/
│   └── images/                  # Imagens da apresentação
│       ├── .gitkeep            # Placeholder para Git
│       ├── paginainicial.png    # Dashboard principal
│       ├── listaclient.png      # Lista de clientes
│       ├── cadastro.png         # Formulário de cadastro
│       ├── planos.png           # Planos de treino
│       ├── aulas.png            # Agendamento de aulas
│       ├── franquias.png        # Sistema de franquias
│       ├── notificacoes.png     # Central de notificações
│       └── login.png            # Tela de login
└── README.md                    # Esta documentação
```

## 🎯 Como Usar

### 1. Desenvolvimento Local
```bash
# Método 1: Python (Recomendado)
python -m http.server 8000
# Acesse: http://localhost:8000

# Método 2: Node.js
npm install -g serve
serve .
# Acesse: http://localhost:3000

# Método 3: VS Code Live Server
# Instale extensão "Live Server" e clique com botão direito no index.html
```

### 2. Deploy na Vercel
```bash
# Via Vercel CLI
npm install -g vercel
vercel login
vercel

# Ou conecte seu repositório GitHub no dashboard Vercel
```

### 3. Navegação da Apresentação

#### Controles de Teclado
| Tecla | Ação |
|-------|------|
| `→` / `Space` / `PageDown` | Próximo slide |
| `←` / `PageUp` | Slide anterior |
| `P` | Abrir/fechar painel de navegação |
| `ESC` | Fechar painel / Sair do fullscreen |
| `Home` | Primeiro slide |
| `End` | Último slide |
| `A` | Ativar/desativar autoplay |
| `F11` | Tela cheia |

#### Controles Touch (Mobile)
- **Deslizar esquerda**: Próximo slide
- **Deslizar direita**: Slide anterior
- **Toque no painel**: Navegar para slide específico

## 🛠️ Funcionalidades Avançadas

### Sistema de Fallback de Imagens
```javascript
// Debug de imagens no console do navegador
debugImages()
```

### Autoplay Inteligente
- Ativação: Tecla `A`
- Pausa automática ao abrir navegador
- Intervalo configurável (10s por padrão)

### Performance Monitoring
```javascript
// Acesso ao objeto da apresentação
window.presentation.trackPerformance()
```

### Suporte a Print
- CSS otimizado para impressão
- Quebras de página automáticas
- Elementos de UI removidos na impressão

## 🎨 Personalização

### Modificar Cores e Tema
```css
/* Em css/styles.css */
:root {
    --background: #020817;     /* Fundo principal */
    --foreground: #f8fafc;     /* Texto principal */
    --muted: #0f172a;          /* Fundo secundário */
    --muted-foreground: #94a3b8; /* Texto secundário */
    --border: #1e293b;         /* Bordas */
    --primary: #f8fafc;        /* Destaque */
    --radius: 0.75rem;         /* Border radius */
}
```

### Adicionar Novos Slides
```html
<!-- No index.html -->
<section class="slide" data-slide="11" data-title="Novo Slide">
    <div class="slide-content">
        <h2 class="slide-title">Título do Novo Slide</h2>
        <!-- Conteúdo do slide -->
    </div>
</section>
```

### Configurar Autoplay
```javascript
// Em js/presentation.js
this.autoplayDelay = 15000; // 15 segundos
```

## 📱 Compatibilidade

### Navegadores Suportados
- ✅ Chrome 70+
- ✅ Firefox 65+  
- ✅ Safari 12+
- ✅ Edge 79+

### Dispositivos Testados
- ✅ Desktop (Windows, macOS, Linux)
- ✅ Tablets (iPad, Android)
- ✅ Smartphones (iOS, Android)

### Resoluções Suportadas
- ✅ 1920x1080 (Full HD)
- ✅ 1366x768 (HD)
- ✅ 768x1024 (Tablet)
- ✅ 375x812 (Mobile)

## 🚀 Otimizações de Performance

### Carregamento
- ✅ Fontes web otimizadas (Google Fonts)
- ✅ CSS e JS minificados em produção
- ✅ Imagens lazy loading
- ✅ Preconnect para recursos externos

### Cache (Vercel)
- ✅ Assets estáticos: 1 ano
- ✅ HTML: Cache dinâmico
- ✅ CDN Edge Network global
- ✅ Compressão automática (Gzip/Brotli)

### Lighthouse Score Target
- ✅ Performance: 95+
- ✅ Accessibility: 100
- ✅ Best Practices: 100
- ✅ SEO: 100

## 🔧 Solução de Problemas

### Imagens não aparecem
```javascript
// 1. Debug no console
debugImages()

// 2. Verificar estrutura de arquivos
// assets/images/paginainicial.png (deve existir)

// 3. Testar servidor local
python -m http.server 8000
```

### CSS/JS não carrega
```bash
# 1. Verificar caminhos
ls css/styles.css
ls js/presentation.js

# 2. Limpar cache do navegador
Ctrl+F5 (Windows) / Cmd+R (Mac)

# 3. Verificar console de erros
F12 > Console
```

### Performance lenta
```bash
# 1. Otimizar imagens
# - Usar TinyPNG.com
# - Redimensionar para max 1920px
# - Manter abaixo de 1MB por imagem

# 2. Usar servidor local
# Sempre teste com servidor, não file://

# 3. Verificar Lighthouse
F12 > Lighthouse > Generate Report
```

## 📊 Analytics e Monitoramento

### Métricas Coletadas
- ⏱️ Tempo de carregamento
- 📊 Tempo por slide
- 🖱️ Padrões de navegação
- 📱 Tipos de dispositivo

### Vercel Analytics
```javascript
// Automaticamente habilitado em produção
// Dashboard: vercel.com > Analytics
```

## 🌐 Deploy e URLs

### URLs de Exemplo
- **Produção**: `https://academy-neon-presentation.vercel.app`
- **Preview**: `https://academy-neon-git-main-username.vercel.app`
- **Branch**: `https://academy-neon-git-branch-username.vercel.app`

### Domínio Personalizado
```bash
# Configurar domínio próprio
vercel domains add academy-neon.com.br
```

## 🆘 Suporte e Contribuição

### Documentação
- 📚 [Guia de Deploy](./DEPLOY.md)
- 🔧 [Documentação Vercel](https://vercel.com/docs)
- 🎨 [CSS Variables Reference](./css/styles.css)

### Debug Tools
```javascript
// Console do navegador
debugImages()           // Status das imagens
window.presentation     // Objeto principal
```

### Issues Conhecidos
1. **Safari iOS < 12**: Alguns gestos touch podem não funcionar
2. **IE**: Não suportado (use Edge)
3. **Firefox < 65**: Algumas animações podem ser limitadas

### Reportar Bugs
1. Abra F12 > Console
2. Reproduza o problema
3. Copie mensagens de erro
4. Informe navegador/versão/OS

## 🎉 Créditos

**Desenvolvido por**: 
- 👨‍💻 **Bruno Felipe** - Desenvolvimento do Sistema Academy Neon
- 🎨 **Gustavo Fernandes** - Apresentação e Slides Interativos

**Tecnologias Utilizadas**:
- 🌐 HTML5 Semântico
- 🎨 CSS3 + Custom Properties
- ⚡ JavaScript ES6+
- 🚀 Vercel Edge Platform
- 🔤 Google Fonts (Inter + Fira Code)
- 🎯 Lucide Icons

---

**Versão**: 2.0.0 - Production Ready  
**Última atualização**: 2024  
**Licença**: MIT

### ✨ Novidades da Versão 2.0:
- 🚀 **Deploy automatizado** na Vercel
- 📱 **Touch navigation** para mobile
- 🖼️ **Sistema de fallback** para imagens
- ⚡ **Autoplay inteligente** com controles
- 🛠️ **Debug tools** integradas
- 📊 **Performance monitoring**
- 🎯 **Print optimization**
- 🔄 **Updates automáticos** via Git
- 🌍 **CDN global** para máxima velocidade
- 🔒 **HTTPS automático** e domínio personalizado
