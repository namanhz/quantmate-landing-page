const footerLinks = {
  "Sản phẩm": ["Tính năng", "Bảng giá", "Cách hoạt động", "Đánh giá"],
  "Tài nguyên": ["Hướng dẫn", "Blog", "Tài liệu tham khảo", "FAQ"],
  "Công ty": ["Về chúng tôi", "Liên hệ", "Tuyển dụng"],
  "Kết nối": ["Facebook", "LinkedIn", "Email"],
};

export default function Footer() {
  return (
    <footer className="bg-dark text-on-dark">
      <div className="max-w-7xl mx-auto section-padding py-16 md:py-20">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <span className="font-heading text-xl font-bold">Quant Mate</span>
            <p className="mt-3 text-sm text-on-dark/60 leading-relaxed">
              Trợ lý nghiên cứu AI cho sinh viên Việt Nam.
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, labels]) => (
            <div key={title}>
              <h4 className="font-semibold text-sm mb-4 text-on-dark/80">
                {title}
              </h4>
              <ul className="space-y-2.5">
                {labels.map((label) => (
                  <li key={label}>
                    <span className="text-sm text-on-dark/50 hover:text-on-dark transition-colors duration-200 cursor-default">
                      {label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-on-dark/40">
            &copy; {new Date().getFullYear()} Quant Mate. All rights reserved.
          </p>
          <div className="flex gap-6">
            <span className="text-xs text-on-dark/40 hover:text-on-dark/70 transition-colors cursor-default">
              Chính sách bảo mật
            </span>
            <span className="text-xs text-on-dark/40 hover:text-on-dark/70 transition-colors cursor-default">
              Điều khoản sử dụng
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
