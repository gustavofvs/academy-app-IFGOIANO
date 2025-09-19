# 🖼️ Debug de Imagens - Academy Neon

## ❌ Problema: Imagens não aparecem

### 🔍 Diagnóstico Rápido
Abra o console do navegador (F12) e digite:
```javascript
debugImages()
```

### 📁 Estrutura Necessária
```
assets/images/
├── paginainicial.png   (Dashboard)
├── listaclient.png     (Lista de Clientes) 
├── cadastro.png        (Cadastro de Cliente)
├── planos.png          (Planos de Treino)
├── aulas.png           (Agendamento de Aulas)
├── franquias.png       (Franquias)
├── notificacoes.png    (Notificações)
└── login.png           (Tela de Login)
```

### ✅ Soluções

#### 1. Criar as Imagens
```bash
# 1. Tire screenshots das telas do Academy Neon
# 2. Salve como PNG na pasta assets/images/
# 3. Use nomes exatos listados acima
```

#### 2. Otimizar Imagens
- Formato: PNG
- Tamanho máximo: 1920px de largura
- Peso: Menos de 1MB cada
- Use TinyPNG.com para comprimir

#### 3. Servidor Local
```bash
# SEMPRE use servidor local, nunca file://
python -m http.server 8000
# Acesse: http://localhost:8000
```

#### 4. Fallback Automático
Se imagem não existir, placeholder aparece automaticamente com:
- ✅ Ícone de imagem
- ✅ Nome da tela
- ✅ Mensagem "Imagem não encontrada"

### 🐛 Debug Avançado

#### Console Commands
```javascript
// Verificar todas as imagens
debugImages()

// Verificar uma imagem específica
const img = document.querySelector('[alt="Dashboard do Academy Neon"]');
console.log('Loaded:', img.complete, 'Size:', img.naturalWidth + 'x' + img.naturalHeight);

// Forçar recarregar imagens
location.reload()
```

#### Verificar Network Tab
1. F12 > Network
2. Filtrar por "Img"
3. Recarregar página
4. Ver quais imagens falharam (vermelho)

### 📝 Checklist
- [ ] ✅ Imagens existem na pasta assets/images/
- [ ] ✅ Nomes dos arquivos estão corretos
- [ ] ✅ Usando servidor local (não file://)
- [ ] ✅ Imagens são PNG válidos
- [ ] ✅ Sem erros no console F12
