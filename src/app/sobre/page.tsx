import type { Metadata } from 'next';
import { Container } from '@/components/Container';
import { Reveal } from '@/components/Reveal';
import { Disclaimer } from '@/components/Disclaimer';
import { MagneticButton } from '@/components/MagneticButton';
import { Icon } from '@/components/Icon';

export const metadata: Metadata = {
  title: 'Sobre el sitio',
  alternates: { canonical: '/sobre' },
  description:
    'Qué es esta guía de productos naturales, cómo escribimos cada ficha y por qué el contenido es informativo y no médico.',
};

const comoLeemos = [
  {
    titulo: 'Lenguaje claro y prudente',
    texto:
      'Explicamos qué es cada producto y cómo se usa popularmente, sin prometer efectos médicos ni curativos.',
  },
  {
    titulo: 'Estructura siempre igual',
    texto:
      'Cada ficha sigue el mismo orden: qué es, composición, usos tradicionales, cómo se consume, precauciones, preguntas y fuentes.',
  },
  {
    titulo: 'Precauciones por delante',
    texto:
      'Señalamos embarazo, lactancia, niños, personas medicadas, enfermedades crónicas, alergias y cirugías cuando corresponde.',
  },
  {
    titulo: 'Fuentes de referencia',
    texto:
      'Citamos organismos reconocidos para que puedas profundizar y contrastar la información por tu cuenta.',
  },
];

export default function SobrePage() {
  return (
    <div className="pt-12 sm:pt-16">
      <Container width="wide">
        <Reveal className="max-w-3xl">
          <span className="eyebrow">Sobre el sitio</span>
          <h1 className="mt-4 font-display text-4xl leading-tight text-ink sm:text-5xl">
            Una guía para entender los productos naturales antes de elegirlos.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft">
            Reunimos información sobre productos de dietética y herboristería en fichas simples y
            ordenadas. No vendemos nada y no damos consejo médico. La idea es que tengas un punto de
            partida confiable para conversar con tu profesional de salud y con tu dietética de
            confianza.
          </p>
        </Reveal>
      </Container>

      <section className="mt-16 border-y border-line bg-surface-2/60 py-16 sm:py-20">
        <Container width="wide">
          <Reveal>
            <h2 className="font-display text-3xl text-ink sm:text-[2.4rem]">Cómo escribimos cada ficha</h2>
          </Reveal>
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {comoLeemos.map((c, i) => (
              <Reveal key={c.titulo} delay={i * 0.05}>
                <div className="flex h-full gap-4 rounded-lg border border-line bg-surface p-6">
                  <span className="mt-1 shrink-0 text-brand">
                    <Icon name="Leaf" size={20} weight="duotone" />
                  </span>
                  <div>
                    <h3 className="font-display text-xl text-ink">{c.titulo}</h3>
                    <p className="mt-1.5 text-[0.97rem] leading-relaxed text-ink-soft">{c.texto}</p>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <Reveal>
              <h2 className="font-display text-3xl text-ink sm:text-[2.4rem]">
                Por qué el contenido es informativo
              </h2>
              <div className="prose-materia mt-5">
                <p>
                  Los productos naturales no son medicamentos. Su efecto depende de cada persona, de
                  la dosis y del contexto, y la evidencia disponible varía mucho de un producto a
                  otro.
                </p>
                <p>
                  Por eso evitamos afirmaciones tajantes y promesas de resultados. Preferimos
                  describir qué es cada producto y cómo se ha usado, y recordar siempre la consulta
                  profesional.
                </p>
              </div>
            </Reveal>
            <Reveal delay={0.1} className="flex items-center">
              <Disclaimer />
            </Reveal>
          </div>
          <Reveal className="mt-12">
            <MagneticButton href="/productos" variant="primary">
              Explorar los productos
              <Icon name="ArrowRight" size={18} />
            </MagneticButton>
          </Reveal>
        </Container>
      </section>
    </div>
  );
}
