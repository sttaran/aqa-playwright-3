

export default class TimeFormatHelper {
    static formatTime(time) {
        const date = new Date(time);
        return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
    }

    static formatDate(time) {
        const date = new Date(time);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
}
