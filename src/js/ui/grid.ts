// 生成九宫格
// import { Toolkit } from '../core/toolkit'
// import { Generator } from '../core/generator'
import { Sudoku } from '../core/sudoku'
import { Checker } from '../core/checker'
import PopupNumbers from './popupnumbers';

class Grid {
    private _$container: JQuery;

    constructor(container: JQuery) {
        this._$container = container;
    }
    
    build() {
        // const generator = new Generator();
        // generator.generate();
        // const matrix = generator.matrix;
        const sudoku = new Sudoku();
        sudoku.make();
        
        const matrix = sudoku.puzzleMatrix;

        const rowGroupClasses = ["row_g_top", "row_g_middle", "row_g_bottom"];
        const colGroupClasses = ["col_g_left", "col_g_center", "col_g_right"];

        const $cells = matrix.map((rowValues: { map: (arg0: (cellValue: any, colIndex: any) => JQuery<HTMLElement>) => void; }) =>  rowValues
            .map((cellValue, colIndex) => {
                return $("<span>")
                .addClass(colGroupClasses[colIndex % 3])
                .addClass(cellValue ? 'fixed' : 'empty')
                .text(cellValue)
        }));

        const $divArray = $cells.map(($spanArray: any, rowIndex: number) => {
            return $("<div>")
            .addClass("row")
            .addClass(rowGroupClasses[rowIndex % 3])
            .append($spanArray)
        });

        this._$container.append($divArray);
       
    }

    layout() {
        const width: any = $("span:first", this._$container).width();
        $("span", this._$container)
            .height(width)
            .css({
                "line-height" : `${width}px`,
                "font-size": width < 32 ? `${width / 2}px` : ""
            })
    }
    /**
     * 检查用户解谜的结果，成功则进行提示，失败显示错误位置的标记
     */
    check() {
        // 从界面获取需要检查的数据
        const data = this._$container.children()
        .toArray()
        .map((div: HTMLElement): number[] => {
            return $(div).children()
                         .toArray()
                         .map(span => parseInt($(span).text(), 10) || 0 );

        })

        console.log(data)
        
        const checker = new Checker(data);
        if (checker.check()) {
            return true;
        }

        // 检查不成功，进行标记
        const marks = checker.matrixMarks;
        this._$container.children()
            .each((rowIndex:any, div:any) => {
                $(div).children().each((colIndex,span) => {
                    const $span = $(span);
                    if ($span.is('.fixed') || marks[rowIndex][colIndex] == true) {
                        $span.removeClass('error')
                    } else {
                        $(span).addClass('error')
                    }
                  
                })
            })
    }


    /**
     * 重置当前迷盘到初始状态
     */
    reset() {
        this._$container.find("span:not(.fixed)")
                        .removeClass('error mark1 mark2')
                        .addClass('empty')
                        .text(0)
    }


    /**
     * 清理错误标记
     */
    clear() {
        this._$container.find('span.error')
            .removeClass('error')
    }

    /**
     * 重置新的迷盘，开始新的一局
     */
    rebuild() {
        this._$container.empty();
        this.build();
        this.layout();
    }


    bindPopup(popupNumbers: PopupNumbers) {
        this._$container.on('click', 'span', (e: any) => {
            const $cell = $(e.target);
            if($cell.is('.fixed')) {
                return;
            }
            popupNumbers.popup($cell);
        })
    }
}
//  const grid = new Grid($("#container")).build();
export { Grid };
export default Grid;