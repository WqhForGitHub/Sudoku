// 处理弹出的操作面板

export class PopupNumbers {
    private _$panel:any;
    private _$targetCell:any;
    constructor($panel:any) {
        this._$panel = $panel.hide().removeClass("hidden");  
        
        this._$panel.on('click', 'span', (e: any) => {
            const $cell = this._$targetCell;
            const $span = $(e.target)
            // 1-9, 回填数字
            // mark1, mark2 回填样式
            if ($span.hasClass('mark1')) {
                if ($cell.hasClass('mark1')) {
                    $cell.removeClass('mark1')
                } else {
                    $cell.removeClass('mark2')
                         .addClass('mark1')
                }
            } else if ($span.hasClass('mark2')) {
                if ($cell.hasClass('mark2')) {
                    $cell.removeClass('mark2')
                } else {
                    $cell.removeClass('mark1')
                         .addClass('mark2')
                }
            } else if ($span.hasClass('empty')) {
                $cell.text(0)
                     .addClass('empty');
            } else {
                $cell.removeClass('empty')
                    .text($span.text())
                // 1-9，回填数字
            }
            this.hide();
        });
    }

    popup($cell:any) {
        this._$targetCell = $cell;
        const { left, top } = $cell.position();
        this._$panel
        .css({
            left: `${left}px`,
            top:`${top}px`
        })
        .show();
    }

    hide() {
        this._$panel.hide();
    }
};

export default PopupNumbers