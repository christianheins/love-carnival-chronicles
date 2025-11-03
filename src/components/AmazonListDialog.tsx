import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function AmazonListDialog() {
  const [open, setOpen] = useState(false);

  const amazonUrl = "https://www.amazon.de/wedding/share/kattychristian"; // Replace with your real URL

  const handleContinue = () => {
    window.open(amazonUrl, "_blank");
    setOpen(false);
  };

  return (
    <div className="flex justify-center mt-6">
      <Button
        onClick={() => setOpen(true)}
        className="px-6 py-3 text-lg rounded-2xl bg-rose-500 hover:bg-rose-600 text-white shadow-md"
      >
        💝 Amazon Wedding List
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-lg bg-white rounded-2xl shadow-2xl p-6">
          <DialogHeader>
            <DialogTitle className="text-center text-2xl font-semibold text-gray-800">
              🎁 Amazon Wedding List
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-4 text-gray-700 text-sm md:text-base leading-relaxed">
            <p className="text-justify">
              Esta lista reúne algunas cosas que reflejan lo que nos gusta y disfrutamos compartir.
              ¡Gracias de corazón por tomarse el tiempo de verla y elegir un regalo!
            </p>
            <p className="text-justify">
              This list brings together things that reflect what we love and enjoy sharing. We're so
              grateful you took the time to check it out and pick something for us!
            </p>
            <p className="text-center font-medium mt-4">
              Christian Heins & Katty Alzamora <br />
              Amazon Wedding List
            </p>
            <p className="text-center">
              📦 <span className="font-semibold">Código postal para el envío:</span> 10439
            </p>

            <div className="border-t pt-3 mt-3 text-xs md:text-sm text-gray-600">
              <p className="text-justify">
                <strong>NOTA:</strong> AL COMPRAR, SELECCIONEN SOLO LOS PRODUCTOS TAL COMO APARECEN
                EN LA LISTA, AUNQUE AMAZON OFREZCA OTRAS OPCIONES.
              </p>
              <p className="text-justify mt-2">
                <strong>NOTE:</strong> WHEN MAKING A PURCHASE, PLEASE SELECT ONLY THE ITEMS AS THEY
                APPEAR ON THE LIST, EVEN IF AMAZON SHOWS OTHER BUYING OPTIONS.
              </p>
            </div>
          </div>

          <DialogFooter className="flex justify-center gap-4 mt-6">
            <Button variant="outline" onClick={() => setOpen(false)}>
              Close
            </Button>
            <Button
              onClick={handleContinue}
              className="bg-rose-500 hover:bg-rose-600 text-white rounded-lg"
            >
              Continue to Amazon
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
