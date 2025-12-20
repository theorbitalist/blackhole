import React, { useState } from "react"
import "./Modal.css"

import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react"

import { ExclamationTriangleIcon } from "@heroicons/react/24/outline"

const Modal = () => {
  const [open, setOpen] = useState(true)

  return (
    <div>
      <button
        onClick={() => setOpen(true)}
        className="rounded-md bg-(--grey) px-2.5 py-1.5 text-(--white) outline outline-1 outline-(--white) hover:bg-(--less-white) hover:text-(--grey) transition"
      >
        Open dialog
      </button>

      <Dialog open={open} onClose={setOpen} className="relative z-10">
        {/* Backdrop */}
        <DialogBackdrop
          transition
          className="fixed inset-0 bg-(--grey) transition-opacity data-closed:opacity-0"
        />

        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <DialogPanel
              transition
              className="relative transform overflow-hidden rounded-lg bg-(--grey) text-left shadow-xl outline outline-1 outline-(--white) transition-all data-closed:translate-y-4 data-closed:opacity-0 sm:my-8 sm:w-full sm:max-w-lg data-closed:sm:scale-95"
            >
              {/* Content */}
              <div className="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex size-12 shrink-0 items-center justify-center rounded-full bg-(--red) sm:mx-0 sm:size-10">
                    <ExclamationTriangleIcon
                      className="size-6 text-(--white)"
                    />
                  </div>

                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <DialogTitle
                      className="modal-text-1 text-(--white)"
                    >
                      Deactivate account
                    </DialogTitle>

                    <div className="mt-2">
                      <small className="text-(--less-white)">
                        Are you sure you want to deactivate your account? All of
                        your data will be permanently removed. This action
                        cannot be undone.
                      </small>
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="bg-(--grey) px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6 border-t border-(--white)">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="inline-flex w-full justify-center rounded-md bg-(--red) px-3 py-2 text-(--white) hover:opacity-90 sm:ml-3 sm:w-auto transition modal-text-2"
                >
                  Deactivate
                </button>

                <button
                  type="button"
                  data-autofocus
                  onClick={() => setOpen(false)}
                  className="mt-3 inline-flex w-full justify-center rounded-md bg-transparent px-3 py-2  text-(--white) outline outline-1 outline-(--white) hover:bg-(--less-white) hover:text-(--grey) sm:mt-0 sm:w-auto transition modal-text-2"
                >
                  Cancel
                </button>
              </div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </div>
  )
}

export default Modal
