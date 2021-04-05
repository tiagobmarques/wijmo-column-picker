import {
  showPopup,
  hidePopup,
  hasClass,
  contains,
  closest,
  closestClass,
  createElement,
  getElement,
  removeChild
} from "@grapecity/wijmo";
import { ListBox } from "@grapecity/wijmo.input";
import { FlexGrid, FormatItemEventArgs } from "@grapecity/wijmo.grid";
import { Component, ViewChild } from "@angular/core";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  data: any[];

  // references FlexGrid named 'flex' in the view
  @ViewChild("flex") flex: FlexGrid;
  @ViewChild("columnPicker") columnPicker: ListBox;
  pickerRef: HTMLDivElement;

  constructor() {
    this.data = this._getData();
  }

  ngOnInit() {
    if (this.flex) {
      this.flex.formatItem.addHandler((s: FlexGrid, e: FormatItemEventArgs) => {
        if (e.panel == s.topLeftCells) {
          e.cell.innerHTML =
            '<span class="column-picker-icon glyphicon glyphicon-cog"></span>';
        }
      });
      this.pickerRef = this.columnPicker.hostElement.parentElement as HTMLDivElement;
      // show the column picker when the user clicks the top-left cell
      let ref = this.flex.hostElement.querySelector(".wj-topleft");
      ref.addEventListener("mousedown", e => {
        if (hasClass(e.target as HTMLElement, "column-picker-icon")) {
          let host = this.pickerRef;
          if (!host.offsetHeight) {
            showPopup(host, ref, false, true, false);
            host.focus();
          } else {
            hidePopup(host, true, true);
            this.flex.focus();
          }
        }
      });
      if (this.flex) {
      this.columnPicker.itemsSource = this.flex.columns;
      this.columnPicker.checkedMemberPath = "visible";
      this.columnPicker.displayMemberPath = "header";
    }
    }
  }

  hide() {
    hidePopup(this.pickerRef);
  }

  selectAll(all = true) {
    if(all) {
      this.columnPicker.checkedItems = this.columnPicker.collectionView.items;
    }
    else {
      this.columnPicker.checkedItems = [];
    }
  }

  private _getData() {
    // generate some random data
    let data = [],
      countries = ["US", "Germany", "UK", "Japan", "Italy", "Greece"],
      products = ["Widget", "Sprocket", "Gadget", "Doohickey"],
      colors = ["Black", "White", "Red", "Green", "Blue"],
      dt = new Date();
    for (let i = 0; i < 100; i++) {
      let date = new Date(dt.getFullYear(), i % 12, 25, i % 24, i % 60, i % 60),
        countryId = Math.floor(Math.random() * countries.length),
        productId = Math.floor(Math.random() * products.length),
        colorId = Math.floor(Math.random() * colors.length);
      let item = {
        id: i,
        start: date,
        end: date,
        country: countries[countryId],
        product: products[productId],
        color: colors[colorId],
        countryId: countryId,
        productId: productId,
        colorId: colorId,
        amount1: Math.random() * 10000 - 5000,
        amount2: Math.random() * 10000 - 5000,
        amount3: Math.random() * 10000 - 5000,
        amount4: Math.random() * 10000 - 5000,
        amount5: Math.random() * 10000 - 5000,
        discount: Math.random() / 4,
        active: i % 4 == 0
      };
      data.push(item);
    }

    return data;
  }
}
