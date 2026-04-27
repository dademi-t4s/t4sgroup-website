import Hero from './components/sections/Hero';
import HorizonsIntro from './components/sections/HorizonsIntro';
import Horizon from './components/sections/Horizon';
import T4SCore from './components/sections/T4SCore';
import TechStack from './components/sections/TechStack';
import Process from './components/sections/Process';
import Partners from './components/sections/Partners';
import Team from './components/sections/Team';
import Contacts from './components/sections/Contacts';

export default function Page() {
  return (
    <main>
      <Hero />
      <HorizonsIntro />

      <Horizon
        id="horizon-cloud"
        phase={2}
        align="left"
        title={
          <>
            Cloud Infrastructure
            <br />& CRM Platforms
          </>
        }
        body="Implementazione e modernizzazione di Salesforce, HubSpot e Microsoft Dynamics 365 su infrastruttura cloud AWS, Azure e Google Cloud. Migrazioni controllate, infrastructure-as-code, integrazione end-to-end con i sistemi gestionali, costi prevedibili e observability nativa."
      />

      <Horizon
        id="horizon-ai"
        phase={3}
        align="right"
        title={
          <>
            Applied AI
            <br />& Decision Intelligence
          </>
        }
        body="Lead scoring predittivo, agent assist, retrieval-augmented generation, sintesi automatica delle conversazioni. Integriamo modelli OpenAI, Anthropic e open-source nei processi vendita, customer service e operations — con guardrail di sicurezza, tracciabilità e ROI misurabile."
      />

      <Horizon
        id="horizon-security"
        phase={4}
        align="left"
        title={
          <>
            Cybersecurity
            <br />& Data Protection
          </>
        }
        body="Hardening, identity & access governance, audit trail e gestione incidenti. Allineamento FADP, nLPD e GDPR già al disegno della soluzione — non come check di conformità a fine progetto. Pen-test periodici, vulnerability management e runbook on-call inclusi nei mandati di managed service."
      />

      <Horizon
        id="horizon-data"
        phase={5}
        align="right"
        title={
          <>
            Data Engineering
            <br />& Business Intelligence
          </>
        }
        body="Data warehouse Snowflake e Databricks, reverse-ETL, semantic layer e dashboard Tableau / Power BI. Una sola fonte di verità per finance, vendite e operations. Eventi in real-time, KPI condivisi, decisioni più rapide — anche per chi oggi convive con quindici report Excel disallineati."
      />

      <T4SCore />
      <TechStack />
      <Process />
      <Partners />
      <Team />
      <Contacts />
    </main>
  );
}
