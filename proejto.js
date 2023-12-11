document.addEventListener('DOMContentLoaded', function() {
    // tranforma todos os .button em clicaveis
    const buttons = document.querySelectorAll('.button');
    buttons.forEach(button => {
      button.addEventListener('click', function() {
        // obtem o nivel do digimon pelo texto do botão
        const level = this.textContent;
        buscarDigimonsPorNivel(level); // chama a função para buscar os digimons do nível selecionado
      });
    });
  });
  
  async function buscarDigimonsPorNivel(nivel) {
    const url = 'https://digimon-api.vercel.app/api/digimon';
    try {
      // faz a requisição a API 
      const response = await fetch(url);
      const data = await response.json(); // converte a resposta para JSON
      const digimonsFiltrados = data.filter(digimon => digimon.level === nivel);
      exibirDigimons(digimonsFiltrados); // exibe os digimons filtrados
    } catch (error) {
      console.log('Ocorreu um erro...:', error); // caso haja algum erro exibe no log
    }
  }
  
  function exibirDigimons(digimons) {
    const resultDiv = document.querySelector('#result'); // seleciona a div dos digimons
    resultDiv.innerHTML = ''; // limpa o conteudo anterior
    digimons.map(digimon => {
      const nomeDigimon = document.createElement('p'); //cria um <p> para o nome dos digimons
      nomeDigimon.textContent = digimon.name;
      nomeDigimon.style.cursor = 'pointer'; // muda o cursor para ponteiro
      nomeDigimon.addEventListener('click', function() {
        exibirDigimon(digimon); // adiciona a opção de clique que exibe o digimon
      });
      resultDiv.appendChild(nomeDigimon); // adiciona o nome do digimon a div de resultado
    });
  }
  
  function exibirDigimon(digimon) {
    const resultDiv = document.querySelector('#result'); // seleciona a div que o digimon vai aparecer
    resultDiv.innerHTML = ''; // limpa o conteudo anterior
    const nomeDigimon = document.createElement('p'); // cria um <p> para o nome do digimon
    nomeDigimon.textContent = digimon.name;
    resultDiv.appendChild(nomeDigimon); // adiciona o nome do digimon à div de resultado
    
    const imagemDigimon = document.createElement('img'); // Cria um elemento de imagem para a foto do digimon
    imagemDigimon.src = digimon.img; // define a origem da imagem como a URL do digimon
    resultDiv.appendChild(imagemDigimon); // adiciona a imagem do digimon a div de resultado
  }
