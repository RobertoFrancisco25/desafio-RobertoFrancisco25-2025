
class AbrigoAnimais {
  constructor() {
  
    this.animaisDoAbrigo = {
      'Rex': { tipo: 'cão', brinquedos: ['RATO', 'BOLA'] },
      'Mimi': { tipo: 'gato', brinquedos: ['BOLA', 'LASER'] },
      'Fofo': { tipo: 'gato', brinquedos: ['BOLA', 'RATO', 'LASER'] },
      'Zero': { tipo: 'gato', brinquedos: ['RATO', 'BOLA'] },
      'Bola': { tipo: 'cão', brinquedos: ['CAIXA', 'NOVELO'] },
      'Bebe': { tipo: 'cão', brinquedos: ['LASER', 'RATO', 'BOLA'] },
      'Loco': { tipo: 'jabuti', brinquedos: ['SKATE', 'RATO'] }
    };
    
    this.brinquedosPermitidos = ['RATO', 'BOLA', 'LASER', 'CAIXA', 'NOVELO', 'SKATE'];
  }

  encontraPessoas(brinquedos1, brinquedos2, animaisString) {
    try {
     
      const brinquedosPessoa1 = this.processarBrinquedos(brinquedos1);
      const brinquedosPessoa2 = this.processarBrinquedos(brinquedos2);
      const animais = this.processarAnimais(animaisString);
      const resultado = this.verificarAdocoes(animais, brinquedosPessoa1, brinquedosPessoa2);
      
      return { lista: resultado };
      
    } catch (erro) {
      return { erro: erro.message };
    }
  }

  processarBrinquedos(brinquedosString) {
    if (!brinquedosString) return [];
    
    const brinquedos = brinquedosString.split(',').map(item => item.trim().toUpperCase());
    const brinquedosVistos = [];
    
    for (const brinquedo of brinquedos) {
      if (!this.brinquedosPermitidos.includes(brinquedo)) {
        throw new Error('Brinquedo inválido');
      }
      if (brinquedosVistos.includes(brinquedo)) {
        throw new Error('Brinquedo inválido');
      }
      
      brinquedosVistos.push(brinquedo);
    }
    
    return brinquedosVistos;
  }

  processarAnimais(animaisString) {
    if (!animaisString) return [];
    
    const animais = animaisString.split(',').map(item => item.trim());
    const animaisVistos = [];
    
    for (const animal of animais) {
      if (!this.animaisDoAbrigo[animal]) {
        throw new Error('Animal inválido');
      }
      if (animaisVistos.includes(animal)) {
        throw new Error('Animal inválido');
      }
      
      animaisVistos.push(animal);
    }
    
    return animaisVistos;
  }

  verificarAdocoes(animais, brinquedos1, brinquedos2) {
    const resultado = [];
    let animaisPessoa1 = 0;
    let animaisPessoa2 = 0;
    
    for (const nomeAnimal of animais) {
      const animal = this.animaisDoAbrigo[nomeAnimal];
      const brinquedosAnimal = animal.brinquedos;
      const pessoa1Pode = this.pessoaPodeAdotar(brinquedos1, brinquedosAnimal, nomeAnimal);
      const pessoa2Pode = this.pessoaPodeAdotar(brinquedos2, brinquedosAnimal, nomeAnimal);
      
      let quemAdota = 'abrigo';
      
      if (pessoa1Pode && pessoa2Pode) {
        quemAdota = 'abrigo';
      } 
      else if (pessoa1Pode && animaisPessoa1 < 3) {
        quemAdota = 'pessoa 1';
        animaisPessoa1++;
      }
      else if (pessoa2Pode && animaisPessoa2 < 3) {
        quemAdota = 'pessoa 2';
        animaisPessoa2++;
      }
      
      resultado.push(`${nomeAnimal} - ${quemAdota}`);
    }
    
    resultado.sort();
    
    return resultado;
  }

  pessoaPodeAdotar(brinquedosPessoa, brinquedosAnimal, nomeAnimal) {
  
    if (nomeAnimal === 'Loco') {
      return this.verificaLoco(brinquedosPessoa, brinquedosAnimal);
    }
    
    let indiceAnimal = 0;
    
    for (const brinquedoPessoa of brinquedosPessoa) {
      if (indiceAnimal < brinquedosAnimal.length && 
          brinquedoPessoa === brinquedosAnimal[indiceAnimal]) {
        indiceAnimal++;
      }
    }
    return indiceAnimal === brinquedosAnimal.length;
  }
    verificaLoco(brinquedosPessoa, brinquedosAnimal) {
    for (const brinquedo of brinquedosPessoa) {
      if (brinquedosAnimal.includes(brinquedo)) {
        return true;
      }
    }
    return false;
  }
  
}
export { AbrigoAnimais as AbrigoAnimais };