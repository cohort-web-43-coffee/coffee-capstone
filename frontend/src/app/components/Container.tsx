type ContainerProps = {
     children: any,
     autoMargins?: boolean
}

export function Container(props: ContainerProps) {
     const {children, autoMargins} = props
     if (autoMargins) {
          return <div className={'container mx-auto py-8'}>
               {children}
          </div>
     } else {
          return <div className={'py-8'}>
               {children}
          </div>
     }
}