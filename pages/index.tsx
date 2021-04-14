import { GetStaticProps } from "next";


export default function Home({org}) {
  return (
   <div>
     <h1>{org.login}</h1>
     <h3>{org.description}</h3>
     <p>Site: <a href={org.blog}>{org.blog}</a></p>
   </div>
  )
}

// Next.js sempre teve um foco sem SSR (Server-side Rendering)

/*
Sempre que exportar uma função getStaticProps,
o next vai no momento da build vai executar essa
pagina executa essa função pega os dados dessa func
e montar e mandar para pag tornando ela static.
obs: É recomendada para pag que n muda mtos os dados.
*/
export const getStaticProps: GetStaticProps = async () => {
  //Faz chamada da API aqui.
  const response = await fetch('https://api.github.com/orgs/rocketseat');
  const data = await response.json();
  
  return {
    props: {
      org: data,
    },
    //revalidate=> Tempo em segundos que leva para rebuildar a pag.
    revalidate: 10
  }

};
