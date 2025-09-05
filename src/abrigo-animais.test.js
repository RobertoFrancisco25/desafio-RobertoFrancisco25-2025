import { AbrigoAnimais } from "./abrigo-animais";

describe('Abrigo de Animais', () => {

  test('Deve rejeitar animal inválido', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('CAIXA,RATO', 'RATO,BOLA', 'Lulu');
    expect(resultado.erro).toBe('Animal inválido');
    expect(resultado.lista).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA', 'RATO,NOVELO', 'Rex,Fofo');
      expect(resultado.lista[0]).toBe('Fofo - abrigo');
      expect(resultado.lista[1]).toBe('Rex - pessoa 1');
      expect(resultado.lista.length).toBe(2);
      expect(resultado.erro).toBeFalsy();
  });

  test('Deve encontrar pessoa para um animal intercalando brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas('BOLA,LASER',
      'BOLA,NOVELO,RATO,LASER', 'Mimi,Fofo,Rex,Bola');

      expect(resultado.lista[0]).toBe('Bola - abrigo');
      expect(resultado.lista[1]).toBe('Fofo - pessoa 2');
      expect(resultado.lista[2]).toBe('Mimi - abrigo');
      expect(resultado.lista[3]).toBe('Rex - abrigo');
      expect(resultado.lista.length).toBe(4);
      expect(resultado.erro).toBeFalsy();
  });
  test('Deve exigir ordem correta dos brinquedos para adoção', () => {
    
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,LASER', 
      'BOLA,RATO,LASER', 
      'Fofo'
    );
    expect(resultado.lista[0]).toBe('Fofo - pessoa 2');
  });

  
  test('Deve permitir brinquedos extras intercalados', () => {
    
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,CAIXA,BOLA', 
      'BOLA,RATO', 
      'Rex'
    );
    expect(resultado.lista[0]).toBe('Rex - pessoa 1');
  });

  
  test('Deve deixar animal no abrigo se ambas pessoas forem aptas', () => {
    
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,LASER',
      'BOLA,LASER',
      'Mimi'
    );
    expect(resultado.lista[0]).toBe('Mimi - abrigo');
  });

    
  test('Deve respeitar limite máximo de 3 animais por pessoa', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA,LASER', 
      'SKATE', 
      'Rex,Mimi,Fofo,Bola,Loco'
    );
    
    const animaisPessoa1 = resultado.lista.filter(item => item.includes('pessoa 1')).length;
    
    
    expect(animaisPessoa1).toBeLessThanOrEqual(3);
  });

  
  test('Loco não precisa de ordem específica dos brinquedos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'SKATE,RATO', 
      'RATO,SKATE', 
      'Loco'
    );
    
    expect(resultado.lista[0]).toBe('Loco - abrigo');
  });

  
  test('Loco precisa apenas ter algum brinquedo seu, não todos', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'SKATE',
      'BOLA', 
      'Loco'
    );
    expect(resultado.lista[0]).toBe('Loco - pessoa 1');
  });

  
  test('Deve rejeitar brinquedos duplicados na mesma pessoa', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,RATO,BOLA',
      'BOLA,LASER',
      'Rex'
    );
    expect(resultado.erro).toBe('Brinquedo inválido');
  });

  
  test('Deve rejeitar animais duplicados na lista', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,BOLA',
      'BOLA,LASER',
      'Rex,Rex' 
    );
    expect(resultado.erro).toBe('Animal inválido');
  });

 
  test('Deve rejeitar brinquedos que não existem', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'RATO,OSSO', 
      'BOLA,LASER',
      'Rex'
    );
    expect(resultado.erro).toBe('Brinquedo inválido');
  });

  
  test('Caso complexo combinando várias regras', () => {
    const resultado = new AbrigoAnimais().encontraPessoas(
      'BOLA,RATO,LASER,CAIXA', 
      'RATO,BOLA,SKATE',       
      'Fofo,Rex,Loco,Bola,Bebe'
    );
    
    
    expect(resultado.erro).toBeFalsy();
    
    
    expect(resultado.lista.length).toBe(5);
    
    
    const nomesOrdenados = resultado.lista.map(item => item.split(' - ')[0]);
    const esperadoOrdenado = [...nomesOrdenados].sort();
    expect(nomesOrdenados).toEqual(esperadoOrdenado);
  });
});
