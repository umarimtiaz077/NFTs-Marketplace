import React from "react";

function createCollection() {
  return (
    <>
      <div className={Style.createCollection}>
        <div className={Style.card}>
          <h2>Collection ERC-721</h2>
          <div className={Style.chooseImg}>
            <img
              src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyB3aWR0aD0iMTAwcHgiIGhlaWdodD0iMTAwcHgiIHZpZXdCb3g9IjAgMCA4MCA4MCIgdmVyc2lvbj0iMS4xIiB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHhtbG5zOnhsaW5rPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5L3hsaW5rIj4KICA8ZGVmcz4KICAgIDxsaW5lYXJHcmFkaWVudCB4MT0iMCUiIHkxPSIwJSIgeDI9IjEwMCUiIHkyPSIxMDAlIiBpZD0iODEyODI0MjY3ODQ0Ij4KICAgICAgPHN0b3Agc3RvcC1jb2xvcj0icmdiKDI1NSwgMCwgMTE1KSIgb2Zmc2V0PSIwJSI+PC9zdG9wPgogICAgICA8c3RvcCBzdG9wLWNvbG9yPSJyZ2IoMTE1LCAyNTUsIDApIiBvZmZzZXQ9IjEwMCUiPjwvc3RvcD4KICAgIDwvbGluZWFyR3JhZGllbnQ+CiAgPC9kZWZzPgogIDxnIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPgogICAgPHJlY3QgaWQ9IlJlY3RhbmdsZSIgZmlsbD0idXJsKCM4MTI4MjQyNjc4NDQpIiB4PSIwIiB5PSIwIiB3aWR0aD0iODAiIGhlaWdodD0iODAiPjwvcmVjdD4KICA8L2c+Cjwvc3ZnPg=="
              alt=""
            />
            <div className={Style.choose}>
              <p>At least 300x300 pixels, max. size 5MB, GIF, JPEG or PNG</p>
              <button>Choose File</button>
            </div>
          </div>
          {/* Input -->  1 */}
          <div class={Style.container}>
            <div class={Style.label}>
              Display name <span class={Style.required}>(required)</span>
            </div>
            <div class={Style.input_container}>
              <input
                type="text"
                class={Style.input_field}
                placeholder="Enter collection name"
              />
            </div>
            <div class={Style.note}>Token name cannot be changed in future</div>
          </div>
          {/* Input -->  2 */}

          <div class={Style.container}>
            <div class={Style.label}>
              Symbol <span class={Style.required}>(required)</span>
            </div>
            <div class={Style.input_container}>
              <input
                type="text"
                class={Style.input_field}
                placeholder="Enter token symbol"
              />
            </div>
            <div class={Style.note}>Token name cannot be changed in future</div>
          </div>
          {/* Input -->  3 */}

          <div class={Style.container}>
            <div class={Style.label}>
              Description <span class={Style.required}>(required)</span>
            </div>
            <div class={Style.input_container}>
              <input
                type="text"
                class={Style.input_field}
                placeholder="Spread some words about your token collection"
              />
            </div>
            <div class={Style.note}>Token name cannot be changed in future</div>
          </div>
          {/* Input -->  4 */}
          <div class={Style.container}>
            <div class={Style.label}>
              Short url <span class={Style.required}>(required)</span>
            </div>
            <div class={Style.input_container}>
              <input
                type="text"
                class={Style.input_field}
                placeholder="rarible.com/ Enter short url"
              />
            </div>
            <div class={Style.note}>Will be used as public URL</div>
          </div>

          <button className={Style.create}>Create Collection</button>
        </div>
      </div>
    </>
  );
}

export default createCollection;
