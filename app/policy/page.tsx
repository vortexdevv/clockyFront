import React from "react";

const page = () => {
  return (
    <div className="min-h-screen bg-main p-8 flex flex-col items-center">
      <div className="max-w-4xl w-full bg-white shadow-md rounded-lg p-8">
        {/* English Section */}
        <section className="text-left mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">About Us</h1>
          <p className="text-gray-700 leading-relaxed">
            Welcome to Kloki Watches, your premier destination for luxury
            watches. Our company was founded on a passion for precision and
            excellence, offering the finest timepieces that blend elegance and
            advanced technology. We take pride in providing a diverse range of
            watches that cater to all tastes and needs, from classic to modern
            designs.
            <br />
            <br />
            At Kloki, we believe that a watch is not just a tool for telling
            time, but an expression of personality and style. That’s why we
            carefully select the best global brands known for their high quality
            and unique design. We also offer after-sales services to ensure
            customer satisfaction, including maintenance and repair.
            <br />
            <br />
            We are committed to providing a distinguished and easy shopping
            experience, with flexible payment options and fast, secure delivery
            across the country. Join us on a journey of excellence and style,
            and explore the world of luxury watches with Kloki.
          </p>
        </section>

        <hr className="border-t border-gray-300 my-8" />

        {/* Arabic Section */}
        <section className="text-right">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">من نحن</h1>
          <p className="text-gray-700 leading-relaxed">
            مرحبًا بكم في كلوكي للساعات، وجهتكم الأولى لعالم الساعات الفاخرة.
            تأسست شركتنا على أساس الشغف والدقة في تقديم أفضل الساعات التي تجمع
            بين الأناقة والتكنولوجيا المتقدمة. نحن نفخر بتقديم مجموعة متنوعة من
            الساعات التي تلبي جميع الأذواق والاحتياجات، من الساعات الكلاسيكية
            إلى التصاميم العصرية.
            <br />
            <br />
            في كلوكي، نؤمن بأن الساعة ليست مجرد أداة لمعرفة الوقت، بل هي تعبير
            عن الشخصية والأناقة. لذلك، نحرص على اختيار أفضل العلامات التجارية
            العالمية التي تتميز بالجودة العالية والتصميم الفريد. كما نقدم خدمات
            ما بعد البيع لضمان رضا عملائنا الكرام، بما في ذلك الصيانة والإصلاح.
            <br />
            <br />
            نحن ملتزمون بتقديم تجربة تسوق مميزة وسهلة، مع خيارات دفع مرنة وخدمة
            توصيل سريعة وآمنة لجميع أنحاء الجمهورية. انضموا إلينا في رحلة التميز
            والأناقة، واكتشفوا عالم الساعات الفاخرة مع كلوكي.
          </p>
        </section>
      </div>
    </div>
  );
};

export default page;
