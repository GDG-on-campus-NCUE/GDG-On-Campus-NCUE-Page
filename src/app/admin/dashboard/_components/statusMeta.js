import {
    CheckCircleIcon,
    ClockIcon,
    MinusCircleIcon,
    XCircleIcon,
} from '@heroicons/react/24/outline';

/** 通知信狀態：顏色搭配圖示與文字，不單靠顏色表意。 */
export const EMAIL_STATUS = {
    sent: { label: '已寄出', tone: 'success', icon: CheckCircleIcon },
    failed: { label: '寄送失敗', tone: 'danger', icon: XCircleIcon },
    pending: { label: '寄送中', tone: 'warning', icon: ClockIcon },
    skipped: { label: '未寄信', tone: 'neutral', icon: MinusCircleIcon },
};

export const AUDIT_ACTIONS = {
    'login.success': { label: '登入成功', tone: 'success' },
    'login.denied': { label: '登入遭拒', tone: 'danger' },
    logout: { label: '登出', tone: 'neutral' },
    'certificate.issue': { label: '核發證書', tone: 'info' },
    'certificate.revoke': { label: '撤銷證書', tone: 'danger' },
    'certificate.resend': { label: '重寄通知信', tone: 'warning' },
};
