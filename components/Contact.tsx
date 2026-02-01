import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "2eb2d8d2-689a-4376-bebe-ae7778ae32fe",
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const result = await response.json();
      if (result.success) {
        alert('感謝您的聯繫，信件已成功送達！');
        setFormData({ name: '', email: '', message: '' });
      } else {
        alert('送出失敗，請稍後再試。');
      }
    } catch (error) {
      alert('網路連線異常，請檢查網路。');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="animate-in fade-in slide-in-from-bottom-4 duration-1000 max-w-6xl mx-auto">
      <header className="mb-20">
        <p className="text-[10px] tracking-[0.5em] uppercase text-neutral-400 mb-4 font-medium">Get in touch</p>
        <h1 className="text-4xl md:text-5xl font-light serif text-neutral-900 tracking-tight">與我聯繫</h1>
      </header>
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
        {/* 左側表單 (佔 7 欄) */}
        <div className="lg:col-span-7">
          <form onSubmit={handleSubmit} className="space-y-10">
            <div className="group relative border-b border-neutral-200 focus-within:border-black transition-all duration-500">
              <label className="text-[9px] tracking-[0.3em] uppercase text-neutral-400 group-focus-within:text-black block mb-1 transition-colors">Name 姓名</label>
              <input 
                type="text" 
                required
                placeholder="Your name"
                className="w-full bg-transparent py-4 text-base outline-none font-light placeholder:text-neutral-200"
                value={formData.name}
                onChange={(e) => setFormData({...formData, name: e.target.value})}
              />
            </div>
            
            <div className="group relative border-b border-neutral-200 focus-within:border-black transition-all duration-500">
              <label className="text-[9px] tracking-[0.3em] uppercase text-neutral-400 group-focus-within:text-black block mb-1 transition-colors">Email 電子郵件</label>
              <input 
                type="email" 
                required
                placeholder="email@example.com"
                className="w-full bg-transparent py-4 text-base outline-none font-light placeholder:text-neutral-200"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
              />
            </div>
            
            <div className="group relative border-b border-neutral-200 focus-within:border-black transition-all duration-500">
              <label className="text-[9px] tracking-[0.3em] uppercase text-neutral-400 group-focus-within:text-black block mb-1 transition-colors">Message 訊息內容</label>
              <textarea 
                rows={5}
                required
                placeholder="Tell me about your project"
                className="w-full bg-transparent py-4 text-base outline-none font-light resize-none placeholder:text-neutral-200"
                value={formData.message}
                onChange={(e) => setFormData({...formData, message: e.target.value})}
              />
            </div>
            
            <div className="pt-6">
              <button 
                type="submit" 
                disabled={isSubmitting}
                className="group relative overflow-hidden px-14 py-5 bg-black text-white text-[10px] tracking-[0.4em] uppercase transition-all hover:bg-neutral-800 disabled:bg-neutral-300"
              >
                <span className="relative z-10">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </span>
              </button>
            </div>
          </form>
        </div>
        
        {/* 右側資訊 (佔 5 欄) */}
        <div className="lg:col-span-5 flex flex-col justify-between py-2">
          <div className="space-y-16">
            <section>
              <h3 className="text-[10px] tracking-[0.4em] uppercase text-neutral-400 mb-8 font-bold">Contact Info</h3>
              <div className="space-y-4">
                <div className="group cursor-pointer">
                  <p className="text-[11px] text-neutral-400 uppercase tracking-widest mb-1">Email</p>
                  <p className="text-xl font-light text-neutral-800 group-hover:text-black transition-colors">tina57826@gmail.com</p>
                </div>
                <div className="group cursor-pointer pt-4">
                  <p className="text-[11px] text-neutral-400 uppercase tracking-widest mb-1">Phone</p>
                  <p className="text-xl font-light text-neutral-800 group-hover:text-black transition-colors">+886 925 024 448</p>
                </div>
              </div>
            </section>
            
            <section>
              <h3 className="text-[10px] tracking-[0.4em] uppercase text-neutral-400 mb-8 font-bold">Social</h3>
              <div className="flex gap-8">
                <a href="#" className="text-sm font-medium tracking-widest text-neutral-500 hover:text-black hover:border-b hover:border-black transition-all pb-1">LINKEDIN</a>
                <a href="#" className="text-sm font-medium tracking-widest text-neutral-500 hover:text-black hover:border-b hover:border-black transition-all pb-1">INSTAGRAM</a>
              </div>
            </section>
          </div>

          {/* 底部裝飾文字，增加專業感 */}
          <div className="hidden lg:block pt-20">
            <p className="text-neutral-300 text-[11px] leading-relaxed italic">
              "Architecture is not just about space, <br />
              it's about the connection between people."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;