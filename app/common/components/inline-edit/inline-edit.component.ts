import {Component, Output, Provider, forwardRef, EventEmitter, ElementRef, ViewChild, Renderer} from '@angular/core';
import {ControlValueAccessor, NG_VALUE_ACCESSOR} from "@angular/common";

const INLINE_EDIT_CONTROL_VALUE_ACCESSOR = new Provider(
    NG_VALUE_ACCESSOR, {
        useExisting: forwardRef(() => InlineEditComponent),
        multi: true
    });

@Component({
    selector: 'inline-edit',
    providers: [INLINE_EDIT_CONTROL_VALUE_ACCESSOR],
    styleUrls: ['app/common/components/inline-edit/inline-edit.component.css'],
    templateUrl: 'app/common/components/inline-edit/inline-edit.component.html'
})
export class InlineEditComponent implements ControlValueAccessor{
    @ViewChild('inlineEditControl') inlineEditControl;
    @Output() public onSave:EventEmitter<any> = new EventEmitter();

    private _value:string = '';
    private preValue:string = '';
    private editing:boolean = false;

    public onChange:any = Function.prototype;
    public onTouched:any = Function.prototype;

    get value(): any { return this._value; };

    set value(v: any) {
        if (v !== this._value) {
            this._value = v;
            this.onChange(v);
        }
    }

    constructor(element: ElementRef, private _renderer:Renderer) {}

    // Required for ControlValueAccessor interface
    writeValue(value: any) {
        this._value = value;
    }

    // Required forControlValueAccessor interface
    public registerOnChange(fn:(_:any) => {}):void {this.onChange = fn;}

    // Required forControlValueAccessor interface
    public registerOnTouched(fn:() => {}):void {this.onTouched = fn;};

    edit(value){
        this.preValue = value;
        this.editing = true;

        setTimeout( _ => this._renderer.invokeElementMethod(this.inlineEditControl.nativeElement, 'focus', []));
    }

    onSubmit(value){
        this.onSave.emit(value);
        this.editing = false;
    }

    cancel(value:any){
        this._value = this.preValue;
        this.editing = false;
    }

}
