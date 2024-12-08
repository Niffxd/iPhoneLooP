import { faqs } from './advices.js';
import FAQ from './FAQ';
import style from './FAQs.module.css';

export default function FAQs() {
  return (
    <div className={style.faqs_container}>
      <h2>iPhone Repair FAQs</h2>
      <br />
      <p>
        Please see below our most commonly asked questions about our iPhone
        repairs. If you do not find an answer to your question, please submit a
        request below.
      </p>
      {faqs.map((faq, index) => {
        return <FAQ faq={faq} key={index} />;
      })}
    </div>
  );
}
