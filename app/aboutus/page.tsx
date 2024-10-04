import React from "react";
import Nav from "../components/Nav";

const page = () => {
  return (
    <div className="min-h-screen bg-main md:p-8 flex flex-col items-center text-pretty">
      <Nav />
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg md:p-8 mt-20">
        {/* English Section */}
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 text-gray-900">
          <h1 className="text-3xl font-bold mb-6 text-center">
            About Clocky Watches
          </h1>
          <p className="mb-4">
            At Clocky Watches, we are passionate about providing stylish and
            high-quality timepieces that elevate your everyday life. Established
            in 2022, we have been on a mission to bring both timeless classics
            and modern designs to wristwatch enthusiasts around the world.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">
            Our Vision and Mission
          </h2>
          <p className="mb-4">
            Our vision is to create watches that combine elegance with
            functionality. We believe that a watch is more than just a way to
            tell time—it’s an expression of personal style, and we’re committed
            to helping our customers find the perfect accessory for any
            occasion.
          </p>

          <p className="mb-4">
            Our mission is to continuously innovate and offer our customers a
            wide range of watches that not only meet their functional needs but
            also serve as a fashion statement.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">
            Our Commitment to Quality
          </h2>
          <p className="mb-4">
            At Clocky Watches, we take pride in the quality of our products.
            Every watch we create undergoes rigorous testing and inspection to
            ensure durability and precision. We collaborate with the best
            designers and manufacturers to offer watches that blend
            craftsmanship with cutting-edge technology.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">
            Customer Satisfaction
          </h2>
          <p className="mb-4">
            Our customers are at the heart of everything we do. We are dedicated
            to providing exceptional customer service, from the moment you
            browse our collections to after-sales support. Our return and
            replacement policy ensures that every customer is satisfied with
            their purchase.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">Contact Us</h2>
          <p className="mb-4">
            If you have any questions about our products, or would like to learn
            more about Clocky Watches, feel free to reach out to us:
          </p>
          <ul className="list-none mb-6">
            <li>
              <strong>Phone:</strong>{" "}
              <a href="tel:201113283189" className="text-blue-600 underline">
                01113283189
              </a>
            </li>
            <li>
              <strong>Email:</strong>{" "}
              <a
                href="mailto:info@clocky.com"
                className="text-blue-600 underline"
              >
                info@clocky.com
              </a>
            </li>
          </ul>
        </div>

        <hr className="border-t border-gray-300 my-8" />

        {/* Arabic Section */}
        <div className="max-w-4xl mx-auto p-6 bg-gray-100 text-gray-900 text-right">
          <h1 className="text-3xl font-bold mb-6 text-center">
            من نحن - شركة كلوكي للساعات
          </h1>
          <p className="mb-4">
            في شركة كلوكي للساعات، نحن شغوفون بتقديم ساعات أنيقة وعالية الجودة
            ترتقي بحياتك اليومية. تأسست الشركة في عام [عام التأسيس]، ومنذ ذلك
            الحين نعمل على جلب التصاميم الكلاسيكية الحديثة لعشاق الساعات حول
            العالم.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">رؤيتنا ومهمتنا</h2>
          <p className="mb-4">
            رؤيتنا هي إنشاء ساعات تجمع بين الأناقة والوظائف العملية. نؤمن أن
            الساعة ليست مجرد وسيلة لمعرفة الوقت، بل هي تعبير عن الأسلوب الشخصي،
            ونحن ملتزمون بمساعدة عملائنا على العثور على الإكسسوار المثالي لكل
            مناسبة.
          </p>

          <p className="mb-4">
            مهمتنا هي الابتكار المستمر وتقديم مجموعة واسعة من الساعات التي لا
            تقتصر على تلبية احتياجات العملاء العملية بل تعبر أيضًا عن الذوق
            الشخصي.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">التزامنا بالجودة</h2>
          <p className="mb-4">
            نحن في كلوكي للساعات نعتز بجودة منتجاتنا. تخضع كل ساعة نصنعها
            لاختبارات صارمة وفحص دقيق لضمان المتانة والدقة. نتعاون مع أفضل
            المصممين والمصنعين لنقدم ساعات تمزج بين الحرفية والتكنولوجيا
            المتطورة.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">رضا العملاء</h2>
          <p className="mb-4">
            عملاؤنا هم محور كل ما نقوم به. نحن ملتزمون بتقديم خدمة عملاء
            استثنائية، بدءًا من تصفح مجموعاتنا وحتى دعم ما بعد البيع. تضمن سياسة
            الاستبدال والاسترجاع لدينا أن كل عميل يكون راضيًا عن مشترياته.
          </p>

          <h2 className="text-2xl font-semibold mt-6 mb-4">تواصل معنا</h2>
          <p className="mb-4">
            إذا كانت لديك أي أسئلة حول منتجاتنا، أو ترغب في معرفة المزيد عن شركة
            كلوكي للساعات، لا تتردد في التواصل معنا:
          </p>
          <ul className="list-none mb-6">
            <li>
              <strong>الهاتف:</strong>{" "}
              <a href="tel:+201113283189" className="text-blue-600 underline">
                01113283189
              </a>
            </li>
            <li>
              <strong>البريد الإلكتروني:</strong>{" "}
              <a
                href="mailto:info@clocky.com"
                className="text-blue-600 underline"
              >
                info@clocky.com
              </a>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default page;
