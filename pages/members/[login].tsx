import { useRouter } from 'next/router';
import { GetStaticProps, GetStaticPaths } from 'next';

export default function Member({user}) {
    /*  //Habilita isso caso queira pegar o valor que vier da query.
        //Exp: http://localhost/members/lucas. sendo query.login = lucas
        const { query } = useRouter(); 
    */

   //isFallback serve para trabalhar com o fallback, é um loading que fica até o novo dado ser gerado. 
   const { isFallback } = useRouter();

   if(isFallback) {
       return <p>Loading...</p>
   }

    return (
        <div>
            <img src={user.avatar_url} alt={user.name} width="80" style={{borderRadius:40}} />
            <h1>{user.name}</h1>
            <p>{user.bio}</p>
        </div>
    )
}

//Chamadas que tem caminho que depende de parametro, somos obrigado a criar o metodo getStaticPaths
export const getStaticPaths: GetStaticPaths = async() => {

    const response = await fetch(`https://api.github.com/orgs/rocketseat/members`)
    const data = await response.json();

    const paths  = data.map(member =>{
        return {params: {login: member.login}}
    })

    return{
        //paths:[] => Recebe para cada pag o que quer gerar passando um obj e o params que vc manda os dados.
        paths,
        fallback: true,
    }
    /*fallback => 
        false => Toda vez que a pessoa acessa a pagina com um parametro que n exista ou nao carregou ainda(no sentido de estar os dados da API engessado no HTML) ele ira mostrar 404.
        true => Quando a pessoa tentar acessar com um parametro e n existir os dados dela ja gerado, ele vai procurar na API para ve se existe a informação ou não gerando somente quando forem acessados.
    */
}


export const getStaticProps: GetStaticProps = async (context) => {
    //dentro do context tem os params, serve para pegar os query dentro do useRouter
    //a variavel "login" é referente quando fazemos http://localhost/members/lucas. sendo login = lucas
    const { login } = context.params;

    const response = await fetch(`https://api.github.com/users/${login}`)
    const data = await response.json();

    return {
        props:{
            user: data,
        }
    }

}
