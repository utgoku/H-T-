export interface EditorialSource {
  label: string;
  publisher: string;
  url: string;
}

export interface EditorialSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface KnowledgeArticle {
  slug: string;
  title: string;
  description: string;
  directAnswer: string;
  category: 'Giấc ngủ' | 'Dinh dưỡng' | 'Nhịp sống';
  publishedAt: string;
  updatedAt: string;
  displayDate: string;
  readTime: string;
  accent: string;
  highlights: string[];
  sections: EditorialSection[];
  sources: EditorialSource[];
}

export const knowledgeArticles: KnowledgeArticle[] = [
  {
    slug: 'cai-thien-chat-luong-giac-ngu',
    title: 'Cải thiện chất lượng giấc ngủ: bắt đầu từ 4 điểm có thể đo',
    description: 'Cách theo dõi và cải thiện giấc ngủ bằng thời lượng, giờ thức dậy, môi trường ngủ và tín hiệu ban ngày, không chạy theo một chỉ số duy nhất.',
    directAnswer: 'Để cải thiện chất lượng giấc ngủ, hãy bảo vệ đủ thời gian ngủ, giữ giờ thức dậy tương đối ổn định, giảm các tín hiệu gây tỉnh táo vào buổi tối và theo dõi cảm giác ban ngày trong ít nhất 7 ngày. Một đêm tốt hay xấu chưa đủ để kết luận xu hướng.',
    category: 'Giấc ngủ',
    publishedAt: '2026-08-19',
    updatedAt: '2026-08-19',
    displayDate: '19/08/2026',
    readTime: '7 phút đọc',
    accent: 'from-[#102f35] via-[#17645f] to-[#78b9aa]',
    highlights: [
      'Người trưởng thành khỏe mạnh thường được khuyến nghị ngủ từ 7 giờ mỗi đêm.',
      'Đánh giá xu hướng 7–14 ngày thay vì phản ứng với một đêm đơn lẻ.',
      'Chất lượng ngủ còn thể hiện qua khả năng tỉnh táo và hoạt động ban ngày.',
    ],
    sections: [
      {
        heading: 'Chất lượng giấc ngủ không chỉ là số giờ',
        paragraphs: [
          'Thời lượng là điểm khởi đầu dễ đo, nhưng không phải toàn bộ câu chuyện. Một đêm ngủ đủ giờ vẫn có thể kém phục hồi nếu bạn mất nhiều thời gian để vào giấc, thức giấc nhiều lần hoặc thức dậy trong trạng thái mệt mỏi.',
          'Khi tự theo dõi, hãy ghi bốn tín hiệu: tổng thời gian ngủ ước tính, thời gian cần để vào giấc, số lần thức giấc đáng kể và mức tỉnh táo vào buổi sáng. Thiết bị đeo có thể hỗ trợ nhận biết xu hướng nhưng không phải công cụ chẩn đoán.',
        ],
      },
      {
        heading: '1. Bảo vệ một cửa sổ ngủ đủ dài',
        paragraphs: [
          'Tuyên bố đồng thuận của American Academy of Sleep Medicine và Sleep Research Society khuyến nghị người trưởng thành ngủ từ 7 giờ mỗi đêm một cách đều đặn. Nhu cầu cá nhân vẫn khác nhau; người trẻ, người đang bù thiếu ngủ hoặc đang có bệnh có thể cần nhiều hơn.',
          'Thay vì ép bản thân phải ngủ ngay, hãy bắt đầu từ lịch thức dậy. Chọn một giờ thức phù hợp với phần lớn ngày trong tuần rồi lùi lại một cửa sổ đủ dài cho việc thư giãn và ngủ.',
        ],
      },
      {
        heading: '2. Giảm tín hiệu gây tỉnh táo',
        paragraphs: [
          'Ánh sáng mạnh, công việc kích thích, nicotine và caffeine đều có thể làm cơ thể khó chuyển sang trạng thái nghỉ. NHLBI lưu ý tác động của caffeine có thể kéo dài nhiều giờ; một cốc cà phê cuối buổi chiều vẫn có thể ảnh hưởng giờ ngủ ở một số người.',
          'Không cần biến buổi tối thành một nghi thức phức tạp. Hãy thử 30–60 phút hạ nhịp với ánh sáng dịu, hoạt động lặp lại và ít quyết định.',
        ],
      },
      {
        heading: '3. Thiết kế môi trường ngủ',
        paragraphs: [
          'Một phòng ngủ tối, yên và mát thường hỗ trợ giấc ngủ tốt hơn. Ưu tiên thay đổi có tác động lớn nhất với hoàn cảnh của bạn: rèm cản sáng, giảm thông báo, nút tai hoặc sắp xếp chăn gối thoải mái.',
        ],
      },
      {
        heading: '4. Đọc dữ liệu theo tuần',
        paragraphs: [
          'Trong 7 ngày, mỗi sáng hãy ghi giờ ngủ, giờ thức, số lần tỉnh giấc và mức năng lượng từ 1 đến 5. Chỉ thử một thay đổi, chẳng hạn đưa caffeine về đầu ngày hoặc giữ giờ thức dậy chênh không quá khoảng một giờ.',
          'Sau một tuần, giữ điều có ích, bỏ điều gây quá tải và tiếp tục quan sát. Cách làm này biến lời khuyên chung thành dữ liệu phù hợp với nhịp sống của chính bạn.',
        ],
      },
      {
        heading: 'Khi nào nên tìm hỗ trợ chuyên môn?',
        paragraphs: [
          'Hãy trao đổi với bác sĩ hoặc cơ sở y tế nếu khó ngủ kéo dài, buồn ngủ ban ngày ảnh hưởng an toàn, ngáy to kèm ngưng thở hoặc tình trạng giấc ngủ thay đổi đột ngột. PrymaLab cung cấp giáo dục và cấu trúc thói quen, không chẩn đoán hay điều trị rối loạn giấc ngủ.',
        ],
      },
    ],
    sources: [
      { label: 'Khuyến nghị thời lượng ngủ cho người trưởng thành', publisher: 'AASM & Sleep Research Society', url: 'https://aasm.org/resources/pdf/pressroom/adult-sleep-duration-consensus.pdf' },
      { label: 'Healthy Sleep Habits', publisher: 'NHLBI, National Institutes of Health', url: 'https://www.nhlbi.nih.gov/health/sleep-deprivation/healthy-sleep-habits' },
    ],
  },
  {
    slug: 'dinh-duong-va-giac-ngu',
    title: 'Dinh dưỡng và giấc ngủ: xây nhịp ăn để buổi tối nhẹ hơn',
    description: 'Mối liên hệ thực hành giữa giờ ăn, caffeine, bữa tối và giấc ngủ; cách thử nghiệm thay đổi an toàn trong đời sống hằng ngày.',
    directAnswer: 'Dinh dưỡng hỗ trợ giấc ngủ tốt nhất khi tạo được nhịp ổn định: ăn đủ trong ngày, tránh bữa quá nặng sát giờ ngủ, quan sát thời điểm dùng caffeine và không dùng rượu như một “thuốc ngủ”. Không có một thực phẩm đơn lẻ nào bảo đảm ngủ ngon cho mọi người.',
    category: 'Dinh dưỡng',
    publishedAt: '2026-08-19',
    updatedAt: '2026-08-19',
    displayDate: '19/08/2026',
    readTime: '8 phút đọc',
    accent: 'from-[#17483f] via-[#4f8a6c] to-[#d3bb73]',
    highlights: [
      'Nhịp ăn ổn định thường hữu ích hơn việc săn tìm một “siêu thực phẩm” gây ngủ.',
      'Bữa quá lớn, caffeine muộn và rượu gần giờ ngủ có thể làm giấc ngủ khó ổn định.',
      'Thử một thay đổi trong 7 ngày để biết điều gì thực sự phù hợp với bạn.',
    ],
    sections: [
      {
        heading: 'Vì sao ăn và ngủ cần được nhìn cùng nhau?',
        paragraphs: [
          'Giờ ăn là một phần của nhịp sinh hoạt. Một ngày bỏ bữa rồi ăn bù rất muộn có thể khiến buổi tối nặng nề; ngược lại, một đêm ngủ kém thường làm việc lựa chọn và chuẩn bị bữa ăn ngày hôm sau khó hơn.',
          'PrymaLab không coi dinh dưỡng là danh sách thực phẩm tốt và xấu. Mục tiêu là tạo cấu trúc đủ linh hoạt để có năng lượng ban ngày và không phải giải quyết cơn đói lớn ngay trước giờ ngủ.',
        ],
      },
      {
        heading: 'Ưu tiên nhịp ăn trước thành phần hoàn hảo',
        paragraphs: [
          'Hãy bắt đầu bằng ba câu hỏi: bạn có thường xuyên bỏ bữa không, bữa lớn nhất nằm quá sát giờ ngủ không, và khoảng cách giữa bữa cuối với giờ lên giường có khiến bạn quá no hoặc quá đói không.',
          'Nếu thường ăn rất muộn, đừng dịch chuyển toàn bộ ngay trong một ngày. Có thể tăng chất lượng bữa sớm hơn, chuẩn bị một lựa chọn nhẹ cho cuối ngày và đưa bữa tối tiến lên từng bước nhỏ.',
        ],
      },
      {
        heading: 'Caffeine: thời điểm cũng quan trọng',
        paragraphs: [
          'Caffeine chặn tín hiệu adenosine liên quan đến áp lực ngủ. NHLBI cho biết tác động có thể kéo dài tới khoảng 8 giờ ở một số người. Khả năng chuyển hóa khác nhau nên không có một mốc giờ duy nhất đúng cho tất cả.',
          'Một thử nghiệm đơn giản là giữ lượng dùng tương đối ổn định nhưng đưa lần dùng cuối sớm hơn trong 7 ngày. Theo dõi thời gian vào giấc và mức tỉnh táo sáng hôm sau trước khi quyết định có cần giảm thêm.',
        ],
      },
      {
        heading: 'Bữa tối và rượu',
        paragraphs: [
          'NHLBI khuyến nghị tránh bữa nặng hoặc quá lớn trong vài giờ trước khi ngủ. Nếu đói, một bữa nhẹ có thể phù hợp hơn việc cố nhịn. Người có bệnh nền hoặc chế độ điều trị riêng cần làm theo hướng dẫn của nhân viên y tế.',
          'Rượu có thể tạo cảm giác buồn ngủ lúc đầu nhưng làm giấc ngủ nhẹ và dễ gián đoạn hơn về sau. Vì vậy không nên dùng rượu như cách tự điều trị mất ngủ.',
        ],
      },
      {
        heading: 'Một thử nghiệm 7 ngày',
        paragraphs: ['Chọn duy nhất một biến: giờ caffeine cuối, thời điểm bữa tối hoặc mức độ no trước khi ngủ. Ghi biến đó cùng thời gian vào giấc, số lần thức giấc và mức năng lượng sáng hôm sau.'],
        bullets: [
          'Ngày 1–2: chỉ quan sát, chưa cần sửa.',
          'Ngày 3–7: áp dụng một thay đổi nhỏ và giữ các yếu tố khác tương đối ổn định.',
          'Cuối tuần: giữ thay đổi nếu có lợi và thực tế; nếu không, thử biến khác.',
        ],
      },
      {
        heading: 'Giới hạn cần nhớ',
        paragraphs: ['Nội dung này không phải đơn ăn hay điều trị. Nếu có sụt cân không chủ ý, rối loạn ăn uống, triệu chứng tiêu hóa kéo dài, đang mang thai, có bệnh nền hoặc dùng thuốc ảnh hưởng giấc ngủ, hãy trao đổi với chuyên gia y tế phù hợp.'],
      },
    ],
    sources: [
      { label: 'Healthy Sleep Habits', publisher: 'NHLBI, National Institutes of Health', url: 'https://www.nhlbi.nih.gov/health/sleep-deprivation/healthy-sleep-habits' },
      { label: 'Sleep/Wake Cycle', publisher: 'NHLBI, National Institutes of Health', url: 'https://www.nhlbi.nih.gov/health/sleep/sleep-wake-cycle' },
    ],
  },
  {
    slug: 'tdee-la-gi-cach-uoc-tinh',
    title: 'TDEE là gì? Cách ước tính mà không thần thánh hóa con số',
    description: 'Giải thích BMR, TDEE, phương trình Mifflin–St Jeor, hệ số vận động và cách dùng khoảng ước tính an toàn hơn một con số tuyệt đối.',
    directAnswer: 'TDEE là ước tính tổng năng lượng cơ thể sử dụng trong một ngày. Con số thường được tính từ năng lượng nghỉ ước tính rồi nhân với hệ số vận động; đây là điểm khởi đầu để quan sát, không phải phép đo chính xác hay đơn ăn cá nhân.',
    category: 'Dinh dưỡng',
    publishedAt: '2026-08-19',
    updatedAt: '2026-08-19',
    displayDate: '19/08/2026',
    readTime: '9 phút đọc',
    accent: 'from-[#172f44] via-[#315f78] to-[#7fbab1]',
    highlights: [
      'TDEE là ước tính, không phải lượng calo bắt buộc phải ăn.',
      'PrymaLab dùng Mifflin–St Jeor cho BMR và hiển thị một khoảng quanh TDEE.',
      'Phản hồi thực tế trong 2–4 tuần quan trọng hơn độ chính xác giả tạo.',
    ],
    sections: [
      {
        heading: 'BMR và TDEE khác nhau thế nào?',
        paragraphs: [
          'BMR là mức năng lượng ước tính cơ thể cần để duy trì các chức năng cơ bản khi nghỉ. TDEE mở rộng con số đó bằng cách tính thêm hoạt động hằng ngày và vận động có chủ đích.',
          'Trong công cụ PrymaLab, BMR được ước tính bằng phương trình Mifflin–St Jeor dựa trên cân nặng, chiều cao, tuổi và giới tính dùng trong phương trình. TDEE sau đó được tính bằng hệ số hoạt động do người dùng tự chọn.',
        ],
      },
      {
        heading: 'Phương trình đến từ đâu?',
        paragraphs: [
          'Nghiên cứu gốc công bố năm 1990 xây dựng phương trình dự đoán năng lượng nghỉ từ dữ liệu 498 người trưởng thành khỏe mạnh. Năng lượng nghỉ được đo bằng nhiệt lượng gián tiếp.',
          'Một phương trình quần thể luôn có sai số khi áp dụng cho cá nhân. Thành phần cơ thể, bệnh lý, thuốc, giai đoạn sống và mức vận động thực tế có thể khiến nhu cầu khác đáng kể.',
        ],
      },
      {
        heading: 'Vì sao PrymaLab hiển thị một khoảng?',
        paragraphs: [
          'Hệ số hoạt động là phần dễ sai vì “vận động vừa” có thể mang ý nghĩa rất khác giữa hai người. Hiển thị một khoảng quanh TDEE nhắc rằng đây là vùng khởi đầu, không phải mục tiêu cứng.',
          'Nếu muốn hiểu nhu cầu thực tế, hãy giữ cách ghi nhận tương đối nhất quán trong 2–4 tuần rồi quan sát cân nặng, vòng eo, hiệu suất, cảm giác đói, năng lượng và giấc ngủ.',
        ],
      },
      {
        heading: 'BMI có vai trò gì?',
        paragraphs: [
          'BMI được tính bằng cân nặng chia cho bình phương chiều cao. WHO sử dụng BMI như chỉ số sàng lọc ở người trưởng thành nhưng cũng nêu rõ đây là chỉ dấu thay thế và cần được đọc cùng các đánh giá khác.',
          'BMI không đo trực tiếp thành phần cơ thể và không mô tả đầy đủ sức khỏe một cá nhân. Người có nhiều khối cơ, người cao tuổi, phụ nữ mang thai và một số nhóm dân số cần cách diễn giải phù hợp hơn.',
        ],
      },
      {
        heading: 'Dùng TDEE một cách thực tế',
        paragraphs: ['Hãy xem TDEE như giả thuyết ban đầu. Bắt đầu gần mức duy trì, theo dõi phản hồi và điều chỉnh nhỏ thay vì cắt giảm cực đoan. Nếu mục tiêu liên quan điều trị bệnh hoặc thay đổi cân nặng đáng kể, hãy làm việc với chuyên gia y tế phù hợp.'],
      },
    ],
    sources: [
      { label: 'A new predictive equation for resting energy expenditure', publisher: 'The American Journal of Clinical Nutrition / PubMed', url: 'https://pubmed.ncbi.nlm.nih.gov/2305711/' },
      { label: 'Obesity and overweight: BMI definition and limitations', publisher: 'World Health Organization', url: 'https://www.who.int/news-room/fact-sheets/detail/obesity-and-overweight' },
    ],
  },
];

export function getKnowledgeArticle(slug: string) {
  return knowledgeArticles.find((article) => article.slug === slug);
}
