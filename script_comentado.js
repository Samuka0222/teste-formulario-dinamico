let pessoa = {}
let btnIniciar = document.getElementById('botaoIniciar')
let container = document.getElementById('form')
let res = document.getElementById('res')
res.classList.add('resultado')

btnIniciar.onclick = function addNome() {
    let inputNome = document.createElement('input')
    let labelInput = document.createElement('label')

    //Criando Label
    labelInput.innerHTML = 'Seu nome?'
    labelInput.for = 'txtnome'
    labelInput.style.paddingBottom = '10px'

    //Criando Input
    inputNome.setAttribute("type", 'text')
    inputNome.setAttribute("id", 'txtnome')
    inputNome.setAttribute('placeholder', 'Digite seu nome aqui')
    inputNome.classList.add('inputs')

    // criando Botão
    let btnNext = document.createElement('button')
    btnNext.id = 'btnNxt'
    btnNext.textContent = 'Prosseguir'
    btnNext.classList.add('btns')
    btnNext.style.marginTop = '15px'

    //Adicionando elementos ao container
    let elementos = [labelInput, inputNome, btnNext]
    container.append(...elementos)
    container.style.display = 'flex'
    container.style.flexDirection = 'column'
    container.removeChild(btnIniciar)
    inputNome.focus()

    //Event Listener
    inputNome.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault()
            btnNext.click()
        }
    })

    // Guardando o nome e prosseguindo para idade
    btnNext.onclick = function addIdade() {
        if (inputNome.value === '') {
            alert('[ERRO] Insira seu nome para prosseguir.')
        } else {
            pessoa.nome = document.getElementById('txtnome').value

            //Removendo Inputs e adicionando os novos
            container.removeChild(inputNome)
            container.removeChild(...elementos)
            let inputIdade = document.createElement('input')
            inputIdade.type = 'number'
            inputIdade.id = 'txtIdade'
            inputIdade.classList.add('inputs')
            labelInput.innerHTML = 'Sua idade?'
            labelInput.for = 'txtIdade'
            container.append(labelInput, inputIdade, btnNext)
            inputIdade.focus()

            //event listener
            inputIdade.addEventListener('keypress', (event) => {
                if (event.key === 'Enter') {
                    event.preventDefault()
                    btnNext.click()
                }
            })

            //Guardando a idade, removendo os inputs e prosseguindo para genero
            btnNext.onclick = function addGenero() {
                if (inputIdade.value === '') {
                    alert('[ERRO] Insira sua idade para prosseguir.')
                } else {
                    pessoa.idade = inputIdade.value
                    container.removeChild(labelInput)
                    container.removeChild(inputIdade)
                    container.removeChild(btnNext)

                    function criarRadioInput(id, name, value, labelText) {
                        let input = document.createElement('input')
                        input.type = 'radio'
                        input.id = id
                        input.name = name
                        input.value = value

                        let label = document.createElement('label')
                        label.htmlFor = id
                        label.textContent = labelText

                        let div = document.createElement('div')
                        div.classList.add('radioInput')
                        div.appendChild(input)
                        div.appendChild(label)

                        return div
                    }

                    //Criando radio button para "masculino"
                    let radioMasc = criarRadioInput('sexo-masc', 'sexo', 'Masculino', 'Masculino')
                    radioMasc.children[0].checked = true

                    //Criando o radio button para "feminino"
                    let radioFem = criarRadioInput('sexo-fem', 'sexo', 'Feminino', 'Feminino')

                    //Criando radio button para "outro"
                    let radioOutro = criarRadioInput('sexo-outro', 'sexo', 'Outro', 'Outro')
                    let inputOutro = document.createElement('input')
                    inputOutro.type = 'text'
                    inputOutro.placeholder = 'Insira o seu gênero aqui.'
                    inputOutro.id = 'txtoutro'
                    inputOutro.classList.add('inputs')

                    //Adicionando os inputs Radio na página
                    container.appendChild(labelInput)
                    labelInput.textContent = 'Selecione seu gênero:'
                    container.appendChild(radioMasc)
                    container.appendChild(radioFem)
                    container.appendChild(radioOutro)
                    radioOutro.addEventListener('click', function () {
                        container.removeChild(btnNext)
                        container.appendChild(inputOutro)
                        inputOutro.style.marginTop = '7px'
                        inputOutro.style.display = 'block'
                        container.appendChild(btnNext)
                    })
                    radioMasc.addEventListener('click', function () {
                        inputOutro.style.display = 'none'
                    })
                    radioFem.addEventListener('click', function () {
                        inputOutro.style.display = 'none'
                    })
                    container.appendChild(btnNext)

                    //event listener
                    inputOutro.addEventListener('keypress', (event) => {
                        if (event.key === 'Enter') {
                            event.preventDefault()
                            btnNext.click()
                        }
                    })
                    //Prosseguindo para finalização
                    btnNext.onclick = function finalizar() {
                        let sexoSelecionado = document.querySelector('input[name="sexo"]:checked')
                        let generoSelecionado = sexoSelecionado.value
                        if (generoSelecionado === 'Outro') {
                            let generoOutroDigitado = inputOutro.value
                            if (generoOutroDigitado === '') {
                                alert('[ERRO] Por favor, digite seu gênero')
                                return
                            }
                            pessoa.genero = generoOutroDigitado
                        } else {
                            pessoa.genero = generoSelecionado
                        }

                        //removendo os botões
                        container.removeChild(labelInput, radioFem, radioMasc, radioOutro, inputOutro)
                        container.removeChild(btnNext)

                        //Criando os botões na finalização
                        let btnNome = document.createElement('button')
                        let btnIdade = document.createElement('button')
                        let btnGenero = document.createElement('button')
                        btnNome.classList.add('btns')
                        btnIdade.classList.add('btns')
                        btnGenero.classList.add('btns')
                        btnNome.textContent = 'Seu nome'
                        btnIdade.textContent = 'Sua data de nascimento'
                        btnGenero.textContent = 'Seu gênero'

                        //Página final
                        container.innerHTML = 'Revisar o que você respondeu.'
                        container.appendChild(btnNome)
                        container.appendChild(btnIdade)
                        container.appendChild(btnGenero)
                        container.appendChild(res)

                        btnNome.onclick = function () {
                            res.innerHTML = ''
                            res.innerHTML = `Seu nome é <strong>${pessoa.nome}</strong>.`
                        }

                        btnIdade.onclick = function () {
                            res.innerHTML = `Você tem <strong>${pessoa.idade} anos</strong>.`
                        };

                        btnGenero.onclick = function () {
                            res.innerHTML = ''
                            res.innerHTML = `Você é do gênero: <strong>${pessoa.genero}</strong>`
                        }
                    }
                }
            }
        }
    }
}