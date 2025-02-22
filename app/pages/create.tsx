import { CreateOptionForm } from "@/components/form/CreateOptionForm"




export default function CreatePage() {
  
  return (
    <div className="relative flex min-h-screen flex-col">
      <section className="container grid items-center gap-6 pb-8 pt-6 md:py-10">
        <div className="flex max-w-[980px] flex-col items-start gap-2">
          <h1 className="text-3xl font-extrabold leading-tight tracking-tighter md:text-4xl">Create Option</h1>
          <div className="w-full grid gap-6 md:grid-cols-2">
            <CreateOptionForm />
          </div>
        </div>
      </section>
    </div>
  )
}

