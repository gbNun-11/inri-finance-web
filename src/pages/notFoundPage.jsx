import { useEffect } from 'react'

const NotFound = () => {
  useEffect(() => {
    document.title = '404 - Página Não Encontrada'
  }, [])

  return (
    <main className="mx-auto flex min-h-screen max-w-4xl flex-col items-center justify-center gap-4 p-6 text-center leading-relaxed">
      <div className="space-y-2">
        <h2 className="scroll-m-20 border-b pb-1 text-2xl font-semibold tracking-tight first:mt-0">
          404 - Página Não Encontrada
        </h2>
      </div>

      <div className="space-y-4">
        <p>
          Ops! Parece que a página que você está tentando acessar não existe.
          Talvez ela tenha tirado férias, resolvido explorar o universo ou se
          perdido em algum lugar entre dois buracos negros. 🌌
        </p>

        <p>
          Mas calma, você não está perdido no espaço (ainda). Só lembre da
          terceira lei de Newton: para alcançar algo, é preciso deixar algo para
          trás. Então talvez seja hora de deixar essa página no passado e voltar
          para a página principal ou seguir para o histórico.
        </p>

        <p>
          Claro... você pode ficar por aqui e fingir que encontrou uma página
          secreta, acessível apenas para exploradores interdimensionais. 🧭✨
        </p>

        <p>
          Se você acha que essa página deveria existir (ou quiser conversar
          sobre viagem no tempo e buracos de minhoca), entre em contato. Caso
          contrário, use o menu e volte ao mundo real.
        </p>

        <p>
          Enquanto isso, fica a reflexão: "Se uma página não existe na internet,
          será que ela existiu de verdade?" 🤔💭
        </p>
      </div>
    </main>
  )
}

export default NotFound
