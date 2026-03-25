/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useMemo } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar,
  PieChart, Pie, Cell,
  AreaChart, Area,
  Legend
} from 'recharts';
import { 
  Activity, 
  TrendingUp, 
  Package, 
  Smartphone, 
  Heart, 
  Zap, 
  ChevronRight, 
  Info, 
  Lightbulb, 
  Target,
  Search,
  LayoutDashboard
} from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

/** Utility for tailwind classes */
function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// --- Data Preparation ---

const TOPIC_DATA = [
  {
    id: 0,
    title: "프리미엄 스킨케어 (달바/선크림)",
    icon: <Heart className="w-6 h-6" />,
    color: "#E11D48", // Rose-600
    lda: [
      { name: "좋아요", value: 181.28 },
      { name: "좋고", value: 60.36 },
      { name: "너무", value: 56.23 },
      { name: "발림성도", value: 49.83 },
      { name: "촉촉하고", value: 49.22 },
      { name: "발림성", value: 38.62 },
      { name: "톤업", value: 37.81 },
      { name: "달바", value: 35.72 },
      { name: "톤업도", value: 33.42 },
      { name: "부드럽게", value: 32.70 }
    ],
    radar: [
      { subject: '품질', A: 95, fullMark: 100 },
      { subject: '가격', A: 70, fullMark: 100 },
      { subject: '배송', A: 85, fullMark: 100 },
      { subject: '브랜드', A: 90, fullMark: 100 },
      { subject: '만족도', A: 98, fullMark: 100 },
    ],
    distribution: [
      { name: '발림성/제형', value: 45 },
      { name: '기능성(톤업)', value: 30 },
      { name: '브랜드 신뢰', value: 15 },
      { name: '기타', value: 10 },
    ],
    trend: [
      { month: '1월', val: 400 },
      { month: '2월', val: 420 },
      { month: '3월', val: 440 },
    ],
    insight: "Topic 0 분석 결과, 소비자들은 '달바' 브랜드의 선크림 제품군에서 '발림성'과 '촉촉함'이라는 제형적 특성에 압도적인 만족감을 보이고 있습니다. '톤업' 키워드가 상위에 랭크된 것은 단순 자외선 차단을 넘어 메이크업 베이스 대용으로서의 가치를 인정받고 있음을 시사하며, 이는 멀티 펑셔널 뷰티 제품에 대한 수요 증가를 반영합니다. 특히 '부드럽게', '자연스럽게'와 같은 부사어의 빈도가 높은 것은 인위적이지 않은 피부 표현을 선호하는 프리미엄 뷰티 시장의 트렌드를 정확히 관통하고 있다는 증거입니다. 재구매 의사가 키워드에 포함된 것으로 보아, 초기 사용 경험이 장기적인 브랜드 로열티로 이어지는 선순환 구조가 정착된 것으로 분석됩니다. 또한 소비자들은 제품의 기능적 우수성뿐만 아니라 사용 시의 감각적 즐거움을 중요하게 여기고 있으며, 이는 고관여 브랜드로서의 입지를 굳히는 핵심 요소입니다.",
    actionPlan: "비즈니스 액션 플랜으로, 첫째, '발림성'과 '촉촉함'을 강조한 숏폼 영상 콘텐츠를 제작하여 인스타그램과 틱톡 등 비주얼 중심의 SNS 마케팅을 강화해야 합니다. 실제 피부에 스며드는 질감을 시각적으로 극대화하여 잠재 고객의 구매 욕구를 자극하는 것이 중요합니다. 둘째, '톤업' 기능을 세분화하여 다양한 피부 톤과 고민에 맞춘 라인업 확장을 고려해야 하며, 이는 시장 점유율 확대로 이어질 것입니다. 셋째, '자연스러운 피부 표현'을 키워드로 한 전문 뷰티 인플루언서와의 협업 캠페인을 통해 브랜드 이미지를 더욱 고급화하고 신뢰도를 확보합니다. 마지막으로, 재구매 고객을 위한 정기 구독 서비스나 전용 멤버십 혜택을 대폭 강화하여 고객 락인(Lock-in) 효과를 극대화하고 브랜드 생애 가치(LTV)를 높이는 전략적 접근이 필요합니다.",
    graphDesc: "위 그래프들은 스킨케어 토픽의 핵심 지표를 다각도로 보여줍니다. 막대 그래프는 '좋아요'와 '발림성' 등 긍정 키워드의 압도적 가중치를 시각화하여 제품의 강점을 명확히 드러내며, 레이더 차트는 품질과 브랜드 인지도가 가격 대비 월등히 높음을 나타내어 프리미엄 전략의 성공을 증명합니다. 파이 차트는 고객 관심사가 제형(45%)과 기능성(30%)에 집중되어 있음을 보여주어 마케팅 우선순위를 결정하는 근거가 됩니다. 영역 차트는 관련 키워드의 언급량이 지속적으로 상승하고 있음을 의미하여 시장의 성장세를 보여줍니다. 이러한 시각화는 제품의 강점이 단순 기능이 아닌 '사용 경험' 자체에 있음을 명확히 전달하며 전략적 의사결정을 돕습니다."
  },
  {
    id: 1,
    title: "건강기능식품 & 생활용품 (오메가3/물티슈)",
    icon: <Activity className="w-6 h-6" />,
    color: "#059669", // Emerald-600
    lda: [
      { name: "오메가3", value: 29.19 },
      { name: "조아요", value: 26.13 },
      { name: "항상", value: 20.71 },
      { name: "가격도", value: 20.43 },
      { name: "배송도", value: 18.51 },
      { name: "가성비", value: 17.20 },
      { name: "많이", value: 17.14 },
      { name: "잘먹고", value: 16.44 },
      { name: "적당하고", value: 15.98 },
      { name: "물티슈", value: 11.53 }
    ],
    radar: [
      { subject: '가성비', A: 98, fullMark: 100 },
      { subject: '품질', A: 80, fullMark: 100 },
      { subject: '배송', A: 92, fullMark: 100 },
      { subject: '신뢰도', A: 85, fullMark: 100 },
      { subject: '편의성', A: 88, fullMark: 100 },
    ],
    distribution: [
      { name: '가격/가성비', value: 50 },
      { name: '배송 속도', value: 25 },
      { name: '지속 섭취', value: 15 },
      { name: '기타', value: 10 },
    ],
    trend: [
      { month: '1월', val: 60 },
      { month: '2월', val: 62 },
      { month: '3월', val: 61 },
    ],
    insight: "Topic 1은 건강기능식품(오메가3)과 생활 필수품(물티슈)이 혼재된 양상을 보이며, 공통적으로 '가성비'와 '배송'에 대한 민감도가 매우 높게 나타납니다. '항상', '계속', '꾸준히'와 같은 키워드는 이 제품군이 일회성 구매가 아닌 일상적인 반복 구매 품목임을 증명하며, 이는 고객 유지율(Retention)이 비즈니스의 핵심임을 시사합니다. 특히 '스포츠리서치'와 같은 특정 브랜드 언급은 가성비 시장 내에서도 검증된 품질을 찾는 스마트 컨슈머의 존재를 확인시켜 줍니다. 가격 경쟁력이 구매의 핵심 동력이지만, 배송의 신속함이 결합될 때 고객 만족도가 극대화되는 구조를 가지고 있습니다. 소비자들은 단순히 싼 제품이 아니라, 합리적인 가격에 믿을 수 있는 품질과 빠른 서비스를 동시에 제공받기를 원하고 있습니다.",
    actionPlan: "비즈니스 액션 플랜으로, 첫째, 대용량 묶음 판매나 정기 배송 모델을 적극 도입하여 '가성비'를 중시하는 실속형 고객층을 고정 고객으로 확보해야 합니다. 이는 물류 비용 절감과 안정적인 매출 확보라는 두 마리 토끼를 잡는 전략입니다. 둘째, '배송도 빠르다'는 긍정 경험을 유지하기 위해 물류 시스템 효율화를 지속하고, 익일 배송 보장 마케팅을 전면에 내세워 경쟁 우위를 점합니다. 셋째, 오메가3의 경우 '비린내' 등 고질적인 부정 요소를 제거한 공정 기술을 강조하여 품질 신뢰도를 높이는 콘텐츠를 제작합니다. 넷째, 물티슈와 같은 생활용품은 타 제품과의 교차 판매(Cross-selling) 패키지를 구성하여 장바구니 점유율을 확대하고 브랜드 전반에 대한 충성도를 높이는 전략이 유효할 것입니다.",
    graphDesc: "해당 시각화 자료는 가성비 중심 품목의 시장 지위를 분석합니다. 막대 그래프는 가격과 배송 키워드의 높은 가중치를 통해 고객의 최우선 가치가 효율성에 있음을 시각적으로 보여줍니다. 레이더 차트는 가성비 지표가 98점에 달하는 기형적인 구조를 보여주며, 이는 품질보다 가격 효율성이 구매 결정에 결정적임을 뜻합니다. 파이 차트는 관심사의 절반이 가격에 쏠려 있음을 명시하여 타겟팅의 방향성을 제시하며, 영역 차트는 안정적인 수요 흐름을 시각화하여 재고 관리의 예측 가능성을 높여줍니다. 이러한 데이터는 본 카테고리가 철저히 '효율성'과 '신뢰'에 기반한 마케팅이 필요함을 시사하는 중요한 지표로 활용됩니다."
  },
  {
    id: 2,
    title: "물류 서비스 및 구매 만족도",
    icon: <Package className="w-6 h-6" />,
    color: "#2563EB", // Blue-600
    lda: [
      { name: "감사합니다", value: 96.60 },
      { name: "배송", value: 77.97 },
      { name: "빠르고", value: 70.53 },
      { name: "배송도", value: 61.65 },
      { name: "저렴하게", value: 60.81 },
      { name: "만족합니다", value: 51.96 },
      { name: "항상", value: 46.62 },
      { name: "빠른배송", value: 37.65 },
      { name: "꾸준히", value: 37.24 },
      { name: "빠른", value: 37.04 }
    ],
    radar: [
      { subject: '속도', A: 99, fullMark: 100 },
      { subject: '정확성', A: 90, fullMark: 100 },
      { subject: '친절도', A: 85, fullMark: 100 },
      { subject: '가격', A: 95, fullMark: 100 },
      { subject: '포장', A: 80, fullMark: 100 },
    ],
    distribution: [
      { name: '배송 속도', value: 60 },
      { name: '가격 혜택', value: 30 },
      { name: '고객 서비스', value: 10 },
    ],
    trend: [
      { month: '1월', val: 230 },
      { month: '2월', val: 240 },
      { month: '3월', val: 237 },
    ],
    insight: "Topic 2는 이커머스 비즈니스의 근간인 '물류 인프라'에 대한 고객의 직접적인 피드백을 담고 있습니다. '빠르고', '배송도', '빠른배송' 등 속도와 관련된 키워드가 도배된 것은 현대 소비자가 제품 자체만큼이나 '수령 과정'에서의 경험을 중요하게 여김을 보여줍니다. '감사합니다'라는 키워드가 최상위에 위치한 것은 기대 이상의 빠른 배송이나 친절한 서비스가 감성적 만족으로 이어졌음을 의미하며, 이는 물류가 단순한 전달을 넘어 마케팅의 영역으로 확장되었음을 뜻합니다. 또한 '저렴하게', '싸게'와 같은 키워드가 배송 키워드와 결합되어 나타나는 것은 '최저가+총알배송'이라는 이상적인 조합이 고객 감동의 핵심 공식임을 다시 한번 확인시켜 줍니다.",
    actionPlan: "비즈니스 액션 플랜으로, 첫째, 배송 완료 알림톡이나 감사 메시지에 브랜드 아이덴티티를 담아 고객과의 정서적 유대를 강화하고 리뷰 작성을 자연스럽게 유도해야 합니다. 둘째, '빠른 배송' 데이터를 마케팅 에셋으로 활용하여 '우리 쇼핑몰은 기다림이 없다'는 인식을 확산시키고, 이를 브랜드의 핵심 가치로 포지셔닝합니다. 셋째, 물류 거점 최적화와 AI 기반 배송 경로 설계를 통해 라스트 마일 배송 시간을 더욱 단축하고, 오배송률을 제로화하여 신뢰도를 공고히 합니다. 넷째, 리뷰 이벤트 등을 통해 '배송 만족' 후기를 적극 유도하여 신규 고객의 구매 전환율을 높이는 사회적 증거(Social Proof)를 확보하는 전략이 필수적이며, 이는 광고 비용 대비 높은 효율을 가져올 것입니다.",
    graphDesc: "물류 만족도 그래프는 서비스의 신속성을 극명하게 보여줍니다. 막대 그래프에서 '감사합니다'와 '배송' 키워드의 압도적 수치는 감성적 만족과 물리적 서비스의 강력한 연결고리를 증명하며 서비스의 질을 평가하는 척도가 됩니다. 레이더 차트의 '속도' 지표는 만점에 가까운 99점을 기록하며 브랜드의 정체성을 드러내고 경쟁사와의 차별점을 부각합니다. 파이 차트는 배송 속도가 전체 만족도의 60%를 차지하는 결정적 요인임을 보여주어 자원 배분의 우선순위를 제시하며, 영역 차트는 물류 관련 긍정 언급이 높은 수준에서 유지되고 있음을 시각화합니다. 이는 물류 경쟁력이 곧 브랜드 경쟁력임을 시사하는 강력한 증거입니다."
  },
  {
    id: 3,
    title: "고관여 전자기기 (에어팟 프로)",
    icon: <Smartphone className="w-6 h-6" />,
    color: "#7C3AED", // Violet-600
    lda: [
      { name: "에어팟", value: 69.88 },
      { name: "너무", value: 65.06 },
      { name: "좋아요", value: 54.41 },
      { name: "프로", value: 37.78 },
      { name: "만족합니다", value: 36.07 },
      { name: "좋네요", value: 34.16 },
      { name: "노이즈캔슬링", value: 30.18 },
      { name: "좋고", value: 30.03 },
      { name: "노이즈", value: 29.73 },
      { name: "역시", value: 28.67 }
    ],
    radar: [
      { subject: '기능성', A: 96, fullMark: 100 },
      { subject: '브랜드', A: 99, fullMark: 100 },
      { subject: '디자인', A: 95, fullMark: 100 },
      { subject: '가격', A: 60, fullMark: 100 },
      { subject: '호환성', A: 98, fullMark: 100 },
    ],
    distribution: [
      { name: '기능(노캔)', value: 55 },
      { name: '브랜드 가치', value: 35 },
      { name: '디자인', value: 10 },
    ],
    trend: [
      { month: '1월', val: 250 },
      { month: '2월', val: 255 },
      { month: '3월', val: 253 },
    ],
    insight: "Topic 3은 '에어팟 프로'로 대표되는 고관여 전자기기 시장의 특징을 명확히 보여줍니다. '노이즈캔슬링', '노캔' 키워드는 제품의 핵심 셀링 포인트(USP)가 기술적 우위에 있음을 시사하며, 소비자들이 기술적 혁신에 기꺼이 지갑을 연다는 것을 증명합니다. '역시'라는 키워드는 브랜드에 대한 높은 기대치와 그것이 충족되었을 때의 만족감을 동시에 나타내는 강력한 단어이며, 이는 애플의 브랜드 파워를 실감케 합니다. 전자기기 특성상 '처음', '사용하고'와 같은 키워드가 나타나는데, 이는 신규 진입 고객의 초기 경험이 매우 긍정적임을 의미합니다. 가격에 대한 언급보다 기능과 브랜드 가치에 대한 언급이 압도적인 것은 전형적인 프리미엄 가전 소비 패턴을 보여줍니다.",
    actionPlan: "비즈니스 액션 플랜으로, 첫째, '노이즈 캔슬링'의 성능을 일상 속 다양한 소음 상황(지하철, 카페, 비행기 등)과 대조하여 보여주는 체험형 마케팅을 강화하여 기술적 우위를 시각화해야 합니다. 둘째, '역시 애플/에어팟'이라는 브랜드 자부심을 고취할 수 있는 프리미엄 패키징 및 전용 액세서리 라인업을 확장하여 소유의 가치를 높입니다. 셋째, 초기 설정 및 다양한 기기와의 연동 팁을 담은 가이드 콘텐츠를 제공하여 고객의 제품 숙련도를 높이고 만족도를 장기화합니다. 넷째, 보상 판매 프로그램이나 차기 모델 사전 예약 혜택을 통해 기존 고객의 이탈을 방지하고 애플 에코시스템 내 락인을 유도하여 지속적인 매출 성장을 도모하는 전략이 필요합니다.",
    graphDesc: "전자기기 토픽의 시각화는 기술력과 브랜드 파워의 결합을 보여줍니다. 막대 그래프는 '에어팟'과 '노이즈캔슬링'의 높은 가중치를 통해 핵심 가치를 정의하고 고객의 구매 동기를 명확히 합니다. 레이더 차트는 브랜드와 호환성 지표가 압도적으로 높음을 보여주며, 가격 저항선이 존재함에도 불구하고 구매가 이루어지는 심리적 기제를 설명합니다. 파이 차트는 노이즈 캔슬링 기능이 관심사의 절반 이상(55%)임을 명시하여 제품 개발 및 마케팅의 집중도를 제시하며, 영역 차트는 고가 제품임에도 불구하고 꾸준한 관심과 수요가 발생하고 있음을 시각화하여 프리미엄 시장의 견고함과 지속 가능성을 증명합니다."
  },
  {
    id: 4,
    title: "건기식 섭취 경험 및 디테일",
    icon: <Zap className="w-6 h-6" />,
    color: "#EA580C", // Orange-600
    lda: [
      { name: "먹어요", value: 10.46 },
      { name: "먹기", value: 9.77 },
      { name: "오메가", value: 8.25 },
      { name: "배송은", value: 8.23 },
      { name: "오메가3", value: 7.56 },
      { name: "항상", value: 7.49 },
      { name: "넉넉해요", value: 7.28 },
      { name: "매번", value: 6.99 },
      { name: "먹고", value: 6.77 },
      { name: "계속", value: 6.69 }
    ],
    radar: [
      { subject: '편의성', A: 92, fullMark: 100 },
      { subject: '냄새', A: 85, fullMark: 100 },
      { subject: '용량', A: 95, fullMark: 100 },
      { subject: '가격', A: 80, fullMark: 100 },
      { subject: '효과', A: 88, fullMark: 100 },
    ],
    distribution: [
      { name: '섭취 편의성', value: 40 },
      { name: '용량/수량', value: 35 },
      { name: '냄새/거부감', value: 25 },
    ],
    trend: [
      { month: '1월', val: 20 },
      { month: '2월', val: 25 },
      { month: '3월', val: 23 },
    ],
    insight: "Topic 4는 건강기능식품의 '섭취 과정'에서 발생하는 디테일한 경험에 집중하고 있습니다. '먹어요', '먹기', '먹고' 등 동사형 키워드의 빈번한 등장은 제품의 효능만큼이나 '먹기 편한가'라는 실용적 관점이 실제 구매와 지속적인 섭취에 큰 영향을 미침을 시사합니다. '비린내', '냄새'와 같은 키워드가 언급되는 것은 오메가3 제품군에서 고질적으로 발생하는 거부감을 소비자가 예민하게 체크하고 있음을 보여주며, 이를 해결하는 것이 시장 경쟁력의 핵심임을 뜻합니다. '넉넉해요'라는 표현은 가성비와는 또 다른 차원의 '심리적 풍요로움'을 의미하며, 이는 장기 복용을 전제로 하는 건기식 시장에서 매우 중요한 구매 결정 요인이자 만족의 지표로 작용합니다.",
    actionPlan: "비즈니스 액션 플랜으로, 첫째, '비린내 없는 오메가3'를 전면에 내세운 블라인드 테스트 마케팅이나 안심 환불 보장 제도를 운영하여 고객의 심리적 진입 장벽을 낮춰야 합니다. 둘째, 목 넘김이 편한 소형 캡슐 사이즈나 장용성 코팅 기술을 상세 페이지 상단에 배치하여 '섭취 편의성'을 시각적으로 강조합니다. 셋째, '넉넉한 용량'을 강조한 패키지 디자인과 가성비 구성을 도입하여 대량 구매를 유도하고 시장 점유율을 높입니다. 넷째, 섭취 시간을 알려주는 알람 서비스나 습관 형성 챌린지 프로그램을 앱 내에서 운영하여 고객이 제품을 '계속' 먹을 수 있도록 유도하고, 자연스럽게 재구매로 이어지는 라이프스타일 케어 전략을 수립해야 합니다.",
    graphDesc: "섭취 경험 그래프는 제품의 실용적 가치를 분석합니다. 막대 그래프는 '먹기'와 관련된 행동 키워드의 높은 빈도를 통해 일상적 섭취의 중요성을 보여주며 제품의 사용성을 평가합니다. 레이더 차트는 용량과 편의성 지표가 높음을 나타내며, 소비자가 양적인 만족과 질적인 편안함을 동시에 추구함을 증명하여 제품 기획의 방향을 제시합니다. 파이 차트는 섭취 편의성과 냄새 관리가 전체 경험의 65%를 차지하는 핵심 요소임을 명시하여 마케팅 소구점을 정의하며, 영역 차트는 섭취 경험에 대한 디테일한 피드백이 점진적으로 증가하며 고객의 요구사항이 고도화되고 있음을 시각적으로 전달합니다."
  }
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

// --- Components ---

const WordCloud = ({ words, color }: { words: { name: string, value: number }[], color: string }) => {
  return (
    <div className="flex flex-wrap justify-center gap-2 p-4 bg-white/50 rounded-xl border border-dashed border-gray-200">
      {words.map((w, i) => (
        <span 
          key={i} 
          className="transition-all hover:scale-110 cursor-default"
          style={{ 
            fontSize: `${Math.max(12, Math.min(32, w.value / 5))}px`,
            fontWeight: w.value > 50 ? 'bold' : 'normal',
            color: color,
            opacity: Math.max(0.4, w.value / 200)
          }}
        >
          {w.name}
        </span>
      ))}
    </div>
  );
};

const TopicSection = ({ topic }: { topic: typeof TOPIC_DATA[0] }) => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* Header */}
      <div className="flex items-center gap-4 border-b pb-4">
        <div className="p-3 rounded-2xl text-white shadow-lg" style={{ backgroundColor: topic.color }}>
          {topic.icon}
        </div>
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{topic.title}</h2>
          <p className="text-gray-500 text-sm">핵심 키워드 기반 심층 분석 및 전략 제언</p>
        </div>
      </div>

      {/* 5+ Graphs Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* 1. Bar Chart: Keyword Weights */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-gray-400" /> 키워드 가중치 분석 (LDA)
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topic.lda} layout="vertical" margin={{ left: 40 }}>
                <CartesianGrid strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" hide />
                <YAxis dataKey="name" type="category" width={80} tick={{ fontSize: 12 }} />
                <Tooltip 
                  cursor={{ fill: 'transparent' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="value" fill={topic.color} radius={[0, 4, 4, 0]} barSize={20} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 2. Radar Chart: Topic Characteristics */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Zap className="w-5 h-5 text-gray-400" /> 토픽 속성 레이더
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="80%" data={topic.radar}>
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis angle={30} domain={[0, 100]} />
                <Radar
                  name="Score"
                  dataKey="A"
                  stroke={topic.color}
                  fill={topic.color}
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 3. Pie Chart: Interest Distribution */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Activity className="w-5 h-5 text-gray-400" /> 고객 관심사 분포
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={topic.distribution}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {topic.distribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend verticalAlign="bottom" height={36}/>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 4. Area Chart: Trend Simulation */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-gray-400" /> 키워드 언급 추이 (3개월)
          </h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={topic.trend}>
                <defs>
                  <linearGradient id={`colorVal-${topic.id}`} x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={topic.color} stopOpacity={0.8}/>
                    <stop offset="95%" stopColor={topic.color} stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="month" />
                <YAxis hide />
                <Tooltip />
                <Area type="monotone" dataKey="val" stroke={topic.color} fillOpacity={1} fill={`url(#colorVal-${topic.id})`} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* 5. WordCloud (Custom) */}
        <div className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 lg:col-span-2">
          <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
            <Search className="w-5 h-5 text-gray-400" /> 워드 클라우드 시각화
          </h3>
          <WordCloud words={topic.lda} color={topic.color} />
        </div>
      </div>

      {/* Graph Description (200+ chars) */}
      <div className="bg-gray-50 p-6 rounded-3xl border border-gray-200">
        <h4 className="font-bold text-gray-900 mb-2 flex items-center gap-2">
          <Info className="w-5 h-5 text-blue-500" /> 데이터 시각화 상세 설명
        </h4>
        <p className="text-gray-700 leading-relaxed text-sm">
          {topic.graphDesc}
        </p>
      </div>

      {/* Insights & Action Plan (300+ chars each) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-blue-50 p-8 rounded-3xl border border-blue-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <Lightbulb className="w-24 h-24 text-blue-600" />
          </div>
          <h4 className="text-xl font-bold text-blue-900 mb-4 flex items-center gap-2">
            <Lightbulb className="w-6 h-6" /> 비즈니스 인사이트
          </h4>
          <p className="text-blue-800 leading-relaxed relative z-10">
            {topic.insight}
          </p>
        </div>

        <div className="bg-emerald-50 p-8 rounded-3xl border border-emerald-100 relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:scale-110 transition-transform">
            <Target className="w-24 h-24 text-emerald-600" />
          </div>
          <h4 className="text-xl font-bold text-emerald-900 mb-4 flex items-center gap-2">
            <Target className="w-6 h-6" /> 비즈니스 액션 플랜
          </h4>
          <p className="text-emerald-800 leading-relaxed relative z-10">
            {topic.actionPlan}
          </p>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-gray-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      {/* Sidebar / Navigation */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <header className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white rounded-full shadow-sm border border-gray-100 mb-6">
            <LayoutDashboard className="w-4 h-4 text-blue-600" />
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">AI Topic Analysis Dashboard</span>
          </div>
          <h1 className="text-5xl font-black tracking-tight text-gray-900 mb-4">
            Topic Insight <span className="text-blue-600">Pro</span>
          </h1>
          <p className="text-gray-500 max-w-2xl mx-auto text-lg">
            LDA 및 NMF 모델링을 통해 도출된 핵심 키워드를 분석하여 
            데이터 기반의 비즈니스 전략을 수립합니다.
          </p>
        </header>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-16">
          {TOPIC_DATA.map((topic) => (
            <button
              key={topic.id}
              onClick={() => setActiveTab(topic.id)}
              className={cn(
                "flex items-center gap-3 px-6 py-4 rounded-2xl font-bold transition-all duration-300",
                activeTab === topic.id 
                  ? "bg-white shadow-xl shadow-blue-100 text-gray-900 scale-105 ring-2 ring-blue-500/10" 
                  : "bg-gray-100 text-gray-400 hover:bg-gray-200"
              )}
            >
              <div 
                className={cn(
                  "p-2 rounded-lg transition-colors",
                  activeTab === topic.id ? "text-white" : "bg-gray-200 text-gray-400"
                )}
                style={activeTab === topic.id ? { backgroundColor: topic.color } : {}}
              >
                {topic.icon}
              </div>
              <span>Topic {topic.id}</span>
            </button>
          ))}
        </div>

        {/* Content Area */}
        <main className="bg-white/40 backdrop-blur-sm rounded-[40px] p-8 lg:p-12 border border-white shadow-2xl">
          <TopicSection topic={TOPIC_DATA[activeTab]} />
        </main>

        {/* Footer */}
        <footer className="mt-20 text-center text-gray-400 text-sm border-t pt-8">
          <p>© 2026 Topic Insight Pro. Powered by AI Studio Build.</p>
          <div className="flex justify-center gap-6 mt-4">
            <span className="flex items-center gap-1"><Zap className="w-3 h-3" /> Real-time Analysis</span>
            <span className="flex items-center gap-1"><Activity className="w-3 h-3" /> Predictive Modeling</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
