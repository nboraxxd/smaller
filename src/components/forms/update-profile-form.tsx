'use client'

import omitBy from 'lodash/omitBy'
import isUndefined from 'lodash/isUndefined'
import { toast } from 'sonner'
import { format } from 'date-fns'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useEffect, useMemo, useRef, useState } from 'react'
import { CalendarIcon, LoaderCircleIcon, Upload } from 'lucide-react'

import { cn } from '@/utils'
import { handleBrowserErrorApi } from '@/utils/error'
import { GENDERS } from '@/constants/list'
import { useUploadImageMutation } from '@/lib/tanstack-query/use-file'
import { UpdateMeSchema, UpdateMeSchemaType } from '@/lib/schemas/user.shema'
import { useUpdateUserMutation, useUserQuery } from '@/lib/tanstack-query/use-user'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'

export default function UpdateProfileForm() {
  // const [openCalendar, setOpenCalendar] = useState(false)
  const [file, setFile] = useState<File | null>(null)

  const avatarInputRef = useRef<HTMLInputElement>(null)

  const { data: getUserResponse, isSuccess: isSuccessGetUser } = useUserQuery()

  const uploadImageMutation = useUploadImageMutation()
  const updateUserMutation = useUpdateUserMutation()

  const form = useForm<UpdateMeSchemaType>({
    resolver: zodResolver(UpdateMeSchema),
    defaultValues: {
      name: '',
      birthday: null,
      gender: null,
      fb: null,
      phone: null,
      avatar: null,
    },
  })

  const avatar = form.watch('avatar')

  const previewAvatar = useMemo(() => {
    if (file) {
      return URL.createObjectURL(file)
    }
    return avatar
  }, [avatar, file])

  useEffect(() => {
    if (isSuccessGetUser) {
      const { name, birthday, gender, fb, phone, avatar } = getUserResponse.payload.data

      const validGender = getValidGender(gender)

      form.reset({
        name,
        birthday,
        gender: validGender,
        fb,
        phone,
        avatar,
      })
    }
  }, [form, getUserResponse?.payload.data, isSuccessGetUser])

  const isFormProcessing = !isSuccessGetUser || uploadImageMutation.isPending || updateUserMutation.isPending

  const dobFromDate = new Date()
  dobFromDate.setFullYear(dobFromDate.getFullYear() - 120)

  function getValidGender(gender: string | null) {
    return gender
      ? ['male', 'female', 'other'].includes(gender)
        ? (gender as (typeof GENDERS)[number]['value'])
        : null
      : null
  }

  async function onSubmit(values: UpdateMeSchemaType) {
    if (isFormProcessing) return

    const { name, birthday, gender, fb, phone, avatar } = getUserResponse.payload.data

    const changes = omitBy(
      {
        name: name === values.name ? undefined : values.name,
        birthday: birthday === values.birthday ? undefined : values.birthday,
        gender: gender === values.gender ? undefined : values.gender,
        fb: fb === values.fb ? undefined : values.fb,
        phone: phone === values.phone ? undefined : values.phone,
        avatar: avatar === values.avatar ? undefined : values.avatar,
      },
      isUndefined
    )

    if (Object.keys(changes).length === 0 && !file) {
      toast.info('Không có thông tin nào thay đổi')
      return
    }

    try {
      if (file) {
        const formData = new FormData()
        formData.append('file', file)

        const uploadImageResponse = await uploadImageMutation.mutateAsync(formData)
        const imageUrl = uploadImageResponse.payload.link

        changes.avatar = imageUrl
      }

      await updateUserMutation.mutateAsync(changes)

      toast.success('Cập nhật thông tin thành công')
      setFile(null)
    } catch (error) {
      handleBrowserErrorApi({ error, setError: form.setError })
    }
  }

  function handleReset() {
    if (isFormProcessing) return

    const { name, birthday, gender, fb, phone, avatar } = getUserResponse.payload.data

    const validGender = getValidGender(gender)

    form.reset({
      name,
      birthday,
      gender: validGender,
      fb,
      phone,
      avatar,
    })
    setFile(null)
  }

  return (
    <Form {...form}>
      <form
        noValidate
        className="grid auto-rows-max items-start gap-4 md:gap-8"
        onSubmit={form.handleSubmit(onSubmit, (err) => console.log(err))}
        onReset={handleReset}
      >
        <Card>
          <CardHeader>
            <CardTitle>Thông tin cá nhân</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-x-8 gap-y-4 md:flex-row md:px-4">
              {/* Avatar */}
              <FormField
                control={form.control}
                name="avatar"
                render={() => (
                  <FormItem>
                    <div className="flex justify-center gap-2 md:flex-col md:justify-start">
                      <Avatar className="aspect-1 size-[100px] rounded-md object-cover">
                        <AvatarImage src={previewAvatar ?? undefined} />
                        <AvatarFallback className="rounded-none p-1.5 text-center">Avatar</AvatarFallback>
                      </Avatar>
                      <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        ref={avatarInputRef}
                        onChange={(ev) => {
                          const file = ev.target.files?.[0]
                          file && setFile(file)
                        }}
                      />
                      <button
                        className="flex aspect-1 w-[100px] items-center justify-center rounded-md border border-dashed"
                        type="button"
                        onClick={() => avatarInputRef.current?.click()}
                      >
                        <Upload className="size-4 text-muted-foreground" />
                        <span className="sr-only">Upload</span>
                      </button>
                    </div>
                  </FormItem>
                )}
              />

              <div className="flex w-full grow flex-col gap-4">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-3">
                        <FormLabel htmlFor="name">Tên</FormLabel>
                        <Input id="name" type="text" className="w-full" placeholder="Bruce Wayne" {...field} />
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                {/* Birthday */}
                <FormField
                  control={form.control}
                  name="birthday"
                  render={({ field }) => (
                    <FormItem className="grid w-full gap-3 space-y-0">
                      <FormLabel>Ngày sinh</FormLabel>
                      <Popover modal={true}>
                        <PopoverTrigger asChild>
                          <FormControl>
                            <Button
                              variant={'outline'}
                              className={cn(
                                'gap-4 pl-3 text-left font-normal',
                                !field.value && 'text-muted-foreground'
                              )}
                            >
                              {field.value ? format(field.value, 'dd/MM/yyyy') : <span>Pick a date</span>}
                              <CalendarIcon className="ml-auto size-4 opacity-50" />
                            </Button>
                          </FormControl>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                          <Calendar
                            mode="single"
                            selected={field.value ? new Date(field.value) : undefined}
                            onSelect={(ev) => {
                              field.onChange(ev ? ev.toISOString() : null)
                              // setOpenCalendar(false)
                            }}
                            today={field.value ? new Date(field.value) : new Date()}
                            initialFocus
                            fixedWeeks
                            weekStartsOn={1}
                            fromDate={dobFromDate}
                            toDate={new Date()}
                            captionLayout="dropdown-buttons"
                          />
                        </PopoverContent>
                      </Popover>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Gender */}
                <FormField
                  control={form.control}
                  name="gender"
                  render={({ field }) => (
                    <FormItem className="grid gap-3 space-y-0">
                      <FormLabel>Gender</FormLabel>
                      <FormControl>
                        <RadioGroup
                          onValueChange={field.onChange}
                          defaultValue={field.value ?? undefined}
                          value={field.value ?? undefined}
                          className="flex flex-col gap-4 sm:h-9 sm:flex-row"
                        >
                          {GENDERS.map((item) => (
                            <FormItem key={item.value} className="flex items-center space-x-3 space-y-0">
                              <FormControl>
                                <RadioGroupItem value={item.value} />
                              </FormControl>
                              <FormLabel className="font-normal">{item.label}</FormLabel>
                            </FormItem>
                          ))}
                        </RadioGroup>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Facebook */}
                <FormField
                  control={form.control}
                  name="fb"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-3">
                        <FormLabel htmlFor="fb">Facebook</FormLabel>
                        <Input
                          id="fb"
                          type="url"
                          className="w-full"
                          placeholder="https://www.facebook.com/brucewayne"
                          {...field}
                          onChange={(ev) => field.onChange(ev.target.value !== '' ? ev.target.value : null)}
                          value={field.value ?? ''}
                        />
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                {/* Phone */}
                <FormField
                  control={form.control}
                  name="phone"
                  render={({ field }) => (
                    <FormItem>
                      <div className="grid gap-3">
                        <FormLabel htmlFor="phone">Số điện thoại</FormLabel>
                        <Input
                          id="phone"
                          type="text"
                          className="w-full"
                          placeholder="0987xxx321"
                          {...field}
                          onChange={(ev) => field.onChange(ev.target.value !== '' ? ev.target.value : null)}
                          value={field.value ?? ''}
                        />
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </div>
            </div>
            <div className=" mt-8 flex items-center gap-2 md:ml-auto">
              <Button variant="outline" size="sm" type="reset" disabled={isFormProcessing}>
                Reset
              </Button>
              <Button size="sm" type="submit" className="gap-1.5" disabled={isFormProcessing}>
                {uploadImageMutation.isPending || updateUserMutation.isPending ? (
                  <LoaderCircleIcon className="size-4 animate-spin" />
                ) : null}
                Cập nhật
              </Button>
            </div>
          </CardContent>
        </Card>
      </form>
    </Form>
  )
}
