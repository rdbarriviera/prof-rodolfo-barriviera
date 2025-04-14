"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/layout/Header/Header";
import Footer from "@/components/layout/Footer";

export default function TermsOfUsePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 container py-10 mt-24 md:py-16 max-w-[1200px] mx-auto">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Link
              href="/"
              className="inline-flex items-center text-sm mb-6 text-[var(--primary-color)]"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar para a página inicial
            </Link>

            <div className="space-y-8">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                  Termos de Uso
                </h1>
                <p className="text-muted-foreground">
                  ÚLTIMA ATUALIZAÇÃO: 13 DE AGOSTO DE 2020
                </p>
              </div>

              <div className="prose prose-zinc dark:prose-invert max-w-none">
                <p>
                  Os termos e condições (Termos) descrevem como Prof. Dr.
                  Rodolfo Barriviera (Empresa, nós, e nosso) regula o uso deste
                  website https://profrodolfobarriviera.com (o website). Por
                  favor leia as informações a seguir com cuidado de forma a
                  entender as nossas praticas referentes ao uso do website. A
                  Empresa poderá alterar os Termos a qualquer altura. A Empresa
                  poderá informa-lo da alteração dos Termos utilizando os meios
                  de comunicação disponíveis. A Empresa recomenda que verifique
                  o website com frequência de forma a que veja a versão atual
                  dos Termos e as versões anteriores.
                </p>

                <h2 className="text-xl font-bold mt-8 mb-4">
                  POLÍTICAS DE PRIVACIDADE
                </h2>
                <p>
                  A nossa política de privacidade encontra-se disponível em
                  outra página. A nossa política de privacidade explica-lhe como
                  nós utilizamos os seus dados pessoais. Ao utilizar o nosso
                  website você reconhece que tem conhecimento e aceitas as
                  nossas políticas de privacidade e da forma como processamos os
                  seus dados.
                </p>

                <h2 className="text-xl font-bold mt-8 mb-4">A SUA CONTA</h2>
                <p>
                  Quando usa o nosso website, você fica responsável por
                  assegurar a confidencialidade da sua conta, senha e outros
                  dados. Não poderá passar a sua conta a terceiros. Nós não nos
                  responsabilizamos por acessos não autorizados que resultem de
                  negligencia por parte do utilizador (dono da conta). A empresa
                  está no direito de terminar o serviço, ou cancelar a sua conta
                  e remover os seus dados, caso você partilhe a sua conta.
                </p>

                <h2 className="text-xl font-bold mt-8 mb-4">SERVIÇOS</h2>
                <p>
                  O website permite que você use os serviços disponíveis no
                  website. Não poderá utilizar esses serviços com propósitos
                  ilegais.
                </p>
                <p>
                  Nós poderemos em alguns casos, estipular um valor para poder
                  utilizar o website. Todos os preços serão publicados
                  separadamente nas páginas apropriadas no website. Poderemos em
                  alguns casos, e a qualquer momento mudar os valores para poder
                  aceder.
                </p>
                <p>
                  Poderemos também utilizar sistemas de processamento de
                  pagamentos que terão taxas de processamento de pagamentos.
                  Algumas dessas taxas poderão ser apresentadas quando você
                  escolher um determinado meio de pagamento. Todos os detalhes
                  sobre as taxas desses sistema de pagamentos poderão ser
                  encontrados no seus respectivos websites.
                </p>

                <h2 className="text-xl font-bold mt-8 mb-4">
                  SERVIÇOS DE TERCEIROS
                </h2>
                <p>
                  O website poderá incluir links para outros websites,
                  aplicações ou plataformas.
                </p>
                <p>
                  Nós não controlamos os websites de terceiros, e não seremos
                  responsáveis pelos conteúdos e outro tipo de materiais
                  incluídos nesses websites. Nós deixamos esses disponíveis para
                  você e mantemos todos os nossos serviços e funcionalidades no
                  nosso website.
                </p>

                <h2 className="text-xl font-bold mt-8 mb-4">
                  USOS PROIBIDOS E PROPRIEDADE INTELECTUAL
                </h2>
                <p>
                  Nós concedemos a você uma licença revogável, intransferível e
                  não exclusiva para aceder e usar o nosso website de um
                  dispositivo de acordo com os Termos.
                </p>
                <p>
                  Você não deve usar o website para fins ilegais, ou proibidos.
                  Você não pode usar o website de forma a que possa desabilitar,
                  danificar ou interferir no website.
                </p>
                <p>
                  Todo o conteúdo presente no nosso website incluindo texto,
                  código, gráficos, logos, imagens, vídeos, software utilizados
                  no website (doravante e aqui anteriormente o Conteúdo). O
                  conteúdo é propriedade da empresa, ou dos seus contratados e
                  protegidos por lei (propriedade intelectual) que protegem
                  esses direitos.
                </p>
                <p>
                  Você não pode publicar, partilhar, modificar, fazer engenharia
                  reversa, participar da transferência ou criar e vender
                  trabalhos derivados, ou de qualquer forma usar qualquer um dos
                  Conteúdos. A sua utilização do website não lhe dá o direito de
                  fazer qualquer uso ilegal e não permitido do Conteúdo e, em
                  particular, você não poderá alterar os direitos de propriedade
                  ou avisos no Conteúdo. Você deverá usar o Conteúdo apenas para
                  seu uso pessoal e não comercial. A Empresa não concede a você
                  nenhuma licença para propriedade intelectual dos seus
                  conteúdos.
                </p>

                <h2 className="text-xl font-bold mt-8 mb-4">
                  MATERIAIS DA EMPRESA
                </h2>
                <p>
                  Ao publicar, enviar, submeter, ou efetuar upload do seu
                  Conteúdo, você está a ceder os direitos do uso desse Conteúdo
                  a nós para o desenvolvimento do nosso negócio, incluindo, mas
                  não limitado a, os direitos de transmissão, exibição pública,
                  distribuição, execução pública, cópia, reprodução e tradução
                  do seu Conteúdo; e publicação do seu nome em conexão com o seu
                  Conteúdo.
                </p>
                <p>
                  Nenhuma compensação será paga com relação ao uso do seu
                  Conteúdo. A Empresa não terá obrigação de publicar ou
                  desfrutar de qualquer Conteúdo que você possa nos enviar e
                  poderá remover seu Conteúdo a qualquer momento sem qualquer
                  aviso.
                </p>
                <p>
                  Ao publicar, fazer upload, inserir, fornecer ou enviar o seu
                  Conteúdo, você garante e declara que possui todos os direitos
                  sobre seu Conteúdo.
                </p>

                <h2 className="text-xl font-bold mt-8 mb-4">
                  ISENÇÃO DE CERTAS RESPONSABILIDADES
                </h2>
                <p>
                  As informações disponíveis através do website podem incluir
                  erros tipográficos ou imprecisões. A Empresa não será
                  responsável por essas imprecisões e erros.
                </p>
                <p>
                  A Empresa não faz declarações sobre a disponibilidade,
                  precisão, confiabilidade, adequação e atualidade do Conteúdo
                  contido e dos serviços disponíveis no website. Na medida
                  máxima permitida pela lei aplicável, todos os Conteúdos e
                  serviços são fornecidos no estado em que se encontram. A
                  Empresa se isenta de todas as garantias e condições relativas
                  a este Conteúdo e serviços, incluindo garantias e provisões de
                  comercialização, adequação a um determinado propósito.
                </p>

                <h2 className="text-xl font-bold mt-8 mb-4">INDENIZAÇÃO</h2>
                <p>
                  Você concorda em indemnizar, defender e isentar a Companhia,
                  seus gerentes, diretores, funcionários, agentes e terceiros,
                  por quaisquer custos, perdas, despesas (incluindo honorários
                  de advogados), responsabilidades relativas, ou decorrentes de
                  sua fruição ou incapacidade para aproveitar o website, ou os
                  seus serviços e produtos da Empresa, a sua violação dos
                  Termos, ou a sua violação de quaisquer direitos de terceiros,
                  ou a sua violação da lei aplicável. Você deve cooperar com a
                  Empresa na afirmação de quaisquer defesas disponíveis.
                </p>

                <h2 className="text-xl font-bold mt-8 mb-4">
                  CANCELAMENTO E RESTRIÇÃO DE ACESSO
                </h2>
                <p>
                  A Empresa pode cancelar ou bloquear o seu acesso ou conta no
                  website e os seus respectivos serviços, a qualquer altura, sem
                  aviso, no caso de você violar os Termos e condições.
                </p>

                <h2 className="text-xl font-bold mt-8 mb-4">DIVERSOS</h2>
                <p>
                  A lei que rege os Termos deve ser as leis substantivas do país
                  onde a Empresa está estabelecida, exceto as regras de conflito
                  de leis. Você não deve usar o Website em jurisdições que não
                  dêem efeito a todas as disposições dos Termos.
                </p>
                <p>
                  Nenhuma parceria, emprego ou relacionamento de agência estará
                  implícito entre você e a Empresa como resultado dos Termos ou
                  uso do Website.
                </p>
                <p>
                  Nada nos Termos deverá ser uma derrogação ao direito da
                  Empresa de cumprir com solicitações ou requisitos
                  governamentais, judiciais, policiais e policiais ou requisitos
                  relacionados ao seu usufruto do Website.
                </p>
                <p>
                  Se qualquer parte dos Termos for considerada inválida ou
                  inexequível de acordo com a lei aplicável, as cláusulas
                  inválidas ou inexequíveis serão consideradas substituídas por
                  cláusulas válidas e exequíveis que deverão ser semelhantes à
                  versão original dos Termos e outras partes e seções do
                  Contrato. Termos serão aplicáveis a você e à Empresa.
                </p>
                <p>
                  Os Termos constituem o acordo integral entre você e a Empresa
                  em relação ao desfrute do Website e os Termos substituem todos
                  os anteriores ou comunicações e ofertas, sejam eletrônicas,
                  orais ou escritas, entre você e a Empresa.
                </p>
                <p>
                  A Empresa e suas afiliadas não serão responsáveis por uma
                  falha ou atraso no cumprimento de suas obrigações quando a
                  falha ou atraso resultar de qualquer causa além do controle
                  razoável da Empresa, incluindo falhas técnicas, desastres
                  naturais, bloqueios, embargos, revoltas, atos, regulamentos,
                  legislação. ou ordens de governo, atos terroristas, guerra ou
                  qualquer outra força fora do controle da Empresa.
                </p>
                <p>
                  Em caso de controvérsias, demandas, reclamações, disputas ou
                  causas de ação entre a Empresa e você em relação ao Website ou
                  outros assuntos relacionados, ou aos Termos, você e a Empresa
                  concordam em tentar resolver tais controvérsias, demandas,
                  reclamações, disputas, ou causas de ação por negociação de
                  boa-fé, e em caso de falha de tal negociação, exclusivamente
                  através dos tribunais do país onde a Companhia está
                  estabelecida.
                </p>

                <h2 className="text-xl font-bold mt-8 mb-4">RECLAMAÇÕES</h2>
                <p>
                  Estamos empenhados em resolver quaisquer reclamações sobre a
                  forma como recolhemos ou usamos os seus dados pessoais. Se
                  você gostaria de fazer uma reclamação sobre estes Termos ou
                  nossas práticas em relação aos seus dados pessoais, entre em
                  contato conosco em: rdbarriviera@gmail.com. Responderemos à
                  sua reclamação assim que pudermos e, em qualquer caso, dentro
                  de 30 dias. Esperamos resolver qualquer reclamação que seja
                  levada ao nosso conhecimento, no entanto, se você achar que a
                  sua reclamação não foi adequadamente resolvida, você se
                  reserva no direito de entrar em contato com a autoridade
                  supervisora de proteção de dados local.
                </p>

                <h2 className="text-xl font-bold mt-8 mb-4">
                  INFORMAÇÃO DE CONTATO
                </h2>
                <p>
                  Agradecemos os seus comentários ou perguntas sobre estes
                  Termos. Você pode nos contatar por escrito em
                  <a
                    href="mailto:rdbarriviera@gmail.com"
                    className="text-primary hover:underline"
                  >
                    {" "}
                    rdbarriviera@gmail.com
                  </a>
                  .
                </p>
              </div>
            </div>
          </motion.div>

          <div className="mt-12 flex justify-center">
            <Button
              asChild
              className="bg-[var(--primary-color)] text-[var(--button-foreground)] hover-button"
            >
              <Link href="/">Voltar para a página inicial</Link>
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
